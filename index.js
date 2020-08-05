'use strict';

const spawn = require('./spawn');

module.exports = (function () {
    function preparePayload(data, prevResult) {
        return result => ({ data, result: prevResult ? [].concat(prevResult).concat(result) : result })
    }
    /*1. Storage devices must be formatted as a physical volume before it can participate in the LVM infrastructure (PV)*/
    /**
    * @param {string} volumePath one or more space seperated physical volume paths (ex. /dev/std1 /dev/sdd1)
    * @param {any} [data] data to be passed to promise resolve func.
    * @return {Promise<{ data: any, result: string }>} Promise if resolved it will contain the data that was passed to the fn and the cmd result
    */
    var createPhysicalVolume = (volumePath, data) =>
        spawn('pvcreate', [volumePath]).then(preparePayload(data));

    /*2. Agregate the physical volume(s) into a single contiguous pool of storage - Volume group (VG)*/
    /**
    * @param {string} name volume group name
    * @param {string} volumePath one or more space separated physical volume paths (ex. /dev/std1 /dev/sdd1)
    * @param {any} [data] data to be passed to promise resolve func.
    * @return {Promise<{ data: any, result: string }>} Promise if resolved it will contain the data that was passed to the fn and the cmd result
    */
    var createVolumeGroup = (name, volumePath, data) =>
        spawn('vgcreate', [name, volumePath]).then(preparePayload(data));

    /*3. Create the logical volume*/
    /**
    * @param {string} name logical volume name
    * @param {string|number} sizeGB size of the LV
    * @param {string} groupName name of the volume group
    * @param {string} [cmdInput] lvcreate cmd input
    * @param {any} [data] data to be passed to promise resolve func.
    * @return {Promise<{ data: any, result: string }>} Promise if resolved it will contain the data that was passed to the fn and the cmd result
    */
    var createLogicalVolume = (name, sizeGB, groupName, cmdInput, data) =>
        spawn('lvcreate', ['-L', `${sizeGB}G`, '-n', name, groupName], cmdInput)
            .then(preparePayload(data));

    /**
    * @param {string} name logical volume name
    * @param {string} groupName name of the volume group
    * @param {string} fileSystem type of file system (ex. ext3)
    * @param {string} physicalVolumeLocation location of the logical volume (ex. /dev)
    * @param {any} [data] data to be passed to promise resolve func.
    * @return {Promise<{ data: any, result: string }>} Promise if resolved it will contain the data that was passed to the fn and the cmd result
    */
    var formatLogicalVolume = (name, groupName, fileSystem, physicalVolumeLocation, data) =>
        spawn('mkfs', ['-t', fileSystem, `${physicalVolumeLocation}/${groupName}/${name}`])
            .then(preparePayload(data))

    /**
    * @param {string} name logical volume name
    * @param {string} groupName name of the volume group
    * @param {string} mountPath path of mount point (ex /mnt/name)
    * @param {string} physicalVolumeLocation location of the logical volume (ex. /dev)
    * @param {any} [data] data to be passed to promise resolve func.
    * @return {Promise<{ data: any, result: string[] }>} Promise if resolved it will contain the data that was passed to the fn and the cmd results
    */
    var mountVolume = (name, groupName, fileSystem, mountPath, physicalVolumeLocation, data) =>
        spawn('mkdir', [mountPath]).then(
            result => spawn('mount', ['-t', fileSystem, `${physicalVolumeLocation}/${groupName}/${name}`, mountPath])
                .then(preparePayload(data, result))
        )

    /**
    * @param {string} name logical volume name
    * @param {string} groupName name of the volume group
    * @param {string} physicalVolumeLocation location of the logical volume (ex. /dev)
    * @param {string|number} newSize add size of volume (larger than the current size)
    * @param {any} [data] data to be passed to promise resolve func.
    * @return {Promise<{ data: any, result: string }>} Promise if resolved it will contain the data that was passed to the fn and the cmd result
    */
    var extendVolume = (name, groupName, physicalVolumeLocation, newSize, data) =>
        spawn('lvextend', [`-L+${newSize}G`, `${physicalVolumeLocation}/${groupName}/${name}`])
            .then(preparePayload(data))

    /**
    * @param {string} name logical volume name
    * @param {string} groupName name of the volume group
    * @param {string} physicalVolumeLocation location of the logical volume (ex. /dev)
    * @param {string|number} newSize remove size of volume (less than the current size)
    * @param {any} [data] data to be passed to promise resolve func.
    * @return {Promise<{ data: any, result: string }>} Promise if resolved it will contain the data that was passed to the fn and the cmd result
    */
    var reduceVolume = (name, groupName, physicalVolumeLocation, newSize, data) =>
        spawn('lvreduce', ['-f', `-L-${newSize}G`, `${physicalVolumeLocation}/${groupName}/${name}`])
            .then(preparePayload(data))

    /**
    * @param {string} mountPath path of mount point (ex /mnt/name)
    * @param {string} name logical volume name
    * @param {string} groupName name of the volume group
    * @param {string} physicalVolumeLocation location of the logical volume (ex. /dev)
    * @param {any} [data] data to be passed to promise resolve func.
    * @return {Promise<{ data: any, result: string[] }>} Promise if resolved it will contain the data that was passed to the fn and the cmd result
    */
    var removeVolume = (mountPath, name, groupName, physicalVolumeLocation, data) =>
        spawn('umount', [mountPath]).then(
            result => spawn('lvremove', ['-f', `${physicalVolumeLocation}/${groupName}/${name}`])
                .then(preparePayload(data, result))
        )

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