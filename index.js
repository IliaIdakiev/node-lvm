const exec = require('child_process').exec;

module.exports = (function() {
    'use strict';

    var promisify = (func) => new Promise((resolve, reject) => func(resolve, reject));

    var handle = (data, resolve, reject) => function handler(err, stdout, stderr) {
        if(err) { reject(err); return; }
        if(data && data.result) data.result = stdout;
        else data = stdout;
        resolve(data);
    };

    /*1. Storage devices must be formated as a physical volume before it can participate in the LVM infrastructure (PV)*/
    /**
    * @param volumePath one or more space seperated physical volume paths (ex. /dev/std1 /dev/sdd1)
    * @param data data to be passed to promise resolve func.
    */
    var createPhysicalVolume = (volumePath, data) => promisify((resolve, reject) => exec(`pvcreate ${volumePath}`, handle(data, resolve, reject)));

    /*2. Agregate the physical volume(s) into a single contiguous pool of storage - Volume group (VG)*/
    /**
    * @param name volume group name
    * @param volumePath one or more space seperated physical volume paths (ex. /dev/std1 /dev/sdd1)
    * @param data data to be passed to promise resolve func.
    */
    var createVolumeGroup = (name, volumePath, data) => promisify((resolve, reject) => exec(`vgcreate ${name} ${volumePath}`, handle(data, resolve, reject)));

    /*3. Create the logical volume*/
    /**
    * @param name logical volume name
    * @param sizeGB size of the LV
    * @param groupName name of the volume group
    * @param data data to be passed to promise resolve func.
    */
    var createLogicalVolume = (name, sizeGB, groupName, data) => promisify((resolve, reject) => exec(`lvcreate -L ${sizeGB}G -n ${name} ${groupName}`, handle(data, resolve, reject)));

    /**
    * @param name logical volume name
    * @param groupName name of the volume group
    * @param fileSystem type of file system (ex. ext3)
    * @param physicalVolumeLocation location of the logical volume (ex. /dev)
    * @param data data to be passed to promise resolve func.
    */
    var formatLogicalVolume = (name, groupName, fileSystem, physicalVolumeLocation, data) => promisify((resolve, reject) => exec(`mkfs -t ${fileSystem} ${physicalVolumeLocation}/${groupName}/${name}`, handle(data, resolve, reject)));

    /**
    * @param name logical volume name
    * @param groupName name of the volume group
    * @param mountPath path of mount point (ex /mnt/name)
    * @param physicalVolumeLocation location of the logical volume (ex. /dev)
    * @param data data to be passed to promise resolve func.
    */
    var mountVolume = (name, groupName, mountPath, physicalVolumeLocation,  data) => promisify((resolve, reject) => exec(`mkdir ${mountPath} && mount -t btrfs ${physicalVolumeLocation}/${groupName}/${name} ${mountPath}`, handle(data, resolve, reject)));

    /**
    * @param name logical volume name
    * @param groupName name of the volume group
    * @param physicalVolumeLocation location of the logical volume (ex. /dev)
    * @param newSize add size of volume (larger than the current size)
    * @param data data to be passed to promise resolve func.
    */
    var extendVolume = (name, groupName, physicalVolumeLocation, newSize, data) => promisify((resolve, reject) => exec(`lvextend -L+${newSize}G ${physicalVolumeLocation}/${groupName}/${name}`, handle(data, resolve, reject)));

    /**
    * @param name logical volume name
    * @param groupName name of the volume group
    * @param physicalVolumeLocation location of the logical volume (ex. /dev)
    * @param newSize remove size of volume (less than the current size)
    * @param data data to be passed to promise resolve func.
    */
    var reduceVolume = (name, groupName, physicalVolumeLocation, newSize, data) => promisify((resolve, reject) => exec(`lvreduce -f -L-${newSize}G ${physicalVolumeLocation}/${groupName}/${name}`, handle(data, resolve, reject)));

    /**
    * @param mountPath path of mount point (ex /mnt/name)
    * @param name logical volume name
    * @param groupName name of the volume group
    * @param physicalVolumeLocation location of the logical volume (ex. /dev)
    * @param data data to be passed to promise resolve func.
    */
    var removeVolume = (mountPath, name, groupName, physicalVolumeLocation, data) => promisify((resolve, reject) => exec(`umount ${mountPath} && lvremove -f ${physicalVolumeLocation}/${groupName}/${name}`, handle(data, resolve, reject)));

    return {
        createPhysicalVolume,
        createVolumeGroup,
        createLogicalVolume,
        formatLogicalVolume,
        mountVolume,
        extendVolume,
        reduceVolume,
        removeVolume
    };
}());