/**
* @param {string} volumePath one or more space seperated physical volume paths (ex. /dev/std1 /dev/sdd1)
* @param {any} [data] data to be passed to promise resolve func.
* @return {Promise<{ data: any, result: string }>} Promise if resolved it will contain the data that was passed to the fn and the cmd result
*/
export function createPhysicalVolume(volumePath: string, data?: any): Promise<{
    data: any;
    result: string;
}>;
/**
* @param {string} name volume group name
* @param {string} volumePath one or more space separated physical volume paths (ex. /dev/std1 /dev/sdd1)
* @param {any} [data] data to be passed to promise resolve func.
* @return {Promise<{ data: any, result: string }>} Promise if resolved it will contain the data that was passed to the fn and the cmd result
*/
export function createVolumeGroup(name: string, volumePath: string, data?: any): Promise<{
    data: any;
    result: string;
}>;
/**
* @param {string} name logical volume name
* @param {string|number} sizeGB size of the LV
* @param {string} groupName name of the volume group
* @param {string} [cmdInput] lvcreate cmd input
* @param {any} [data] data to be passed to promise resolve func.
* @return {Promise<{ data: any, result: string }>} Promise if resolved it will contain the data that was passed to the fn and the cmd result
*/
export function createLogicalVolume(name: string, sizeGB: string | number, groupName: string, cmdInput?: string, data?: any): Promise<{
    data: any;
    result: string;
}>;
/**
* @param {string} name logical volume name
* @param {string} groupName name of the volume group
* @param {string} fileSystem type of file system (ex. ext3)
* @param {string} physicalVolumeLocation location of the logical volume (ex. /dev)
* @param {any} [data] data to be passed to promise resolve func.
* @return {Promise<{ data: any, result: string }>} Promise if resolved it will contain the data that was passed to the fn and the cmd result
*/
export function formatLogicalVolume(name: string, groupName: string, fileSystem: string, physicalVolumeLocation: string, data?: any): Promise<{
    data: any;
    result: string;
}>;
/**
* @param {string} name logical volume name
* @param {string} groupName name of the volume group
* @param {string} mountPath path of mount point (ex /mnt/name)
* @param {string} physicalVolumeLocation location of the logical volume (ex. /dev)
* @param {any} [data] data to be passed to promise resolve func.
* @return {Promise<{ data: any, result: string[] }>} Promise if resolved it will contain the data that was passed to the fn and the cmd results
*/
export function mountVolume(name: string, groupName: string, fileSystem: any, mountPath: string, physicalVolumeLocation: string, data?: any): Promise<{
    data: any;
    result: string[];
}>;
/**
* @param {string} name logical volume name
* @param {string} groupName name of the volume group
* @param {string} physicalVolumeLocation location of the logical volume (ex. /dev)
* @param {string|number} newSize add size of volume (larger than the current size)
* @param {any} [data] data to be passed to promise resolve func.
* @return {Promise<{ data: any, result: string }>} Promise if resolved it will contain the data that was passed to the fn and the cmd result
*/
export function extendVolumeWith(name: string, groupName: string, physicalVolumeLocation: string, newSize: string | number, data?: any): Promise<{
    data: any;
    result: string;
}>;
/**
* @param {string} name logical volume name
* @param {string} groupName name of the volume group
* @param {string} physicalVolumeLocation location of the logical volume (ex. /dev)
* @param {string|number} newSize add size of volume (larger than the current size)
* @param {any} [data] data to be passed to promise resolve func.
* @return {Promise<{ data: any, result: string }>} Promise if resolved it will contain the data that was passed to the fn and the cmd result
*/
export function extendVolumeTo(name: string, groupName: string, physicalVolumeLocation: string, newSize: string | number, data?: any): Promise<{
    data: any;
    result: string;
}>;
/**
* @param {string} name logical volume name
* @param {string} groupName name of the volume group
* @param {string} physicalVolumeLocation location of the logical volume (ex. /dev)
* @param {string|number} newSize remove size of volume (less than the current size)
* @param {any} [data] data to be passed to promise resolve func.
* @return {Promise<{ data: any, result: string }>} Promise if resolved it will contain the data that was passed to the fn and the cmd result
*/
export function reduceVolumeWith(name: string, groupName: string, physicalVolumeLocation: string, newSize: string | number, data?: any): Promise<{
    data: any;
    result: string;
}>;
/**
* @param {string} name logical volume name
* @param {string} groupName name of the volume group
* @param {string} physicalVolumeLocation location of the logical volume (ex. /dev)
* @param {string|number} newSize remove size of volume (less than the current size)
* @param {any} [data] data to be passed to promise resolve func.
* @return {Promise<{ data: any, result: string }>} Promise if resolved it will contain the data that was passed to the fn and the cmd result
*/
export function reduceVolumeTo(name: string, groupName: string, physicalVolumeLocation: string, newSize: string | number, data?: any): Promise<{
    data: any;
    result: string;
}>;
/**
* @param {string} mountPath path of mount point (ex /mnt/name)
* @param {string} name logical volume name
* @param {string} groupName name of the volume group
* @param {string} physicalVolumeLocation location of the logical volume (ex. /dev)
* @param {any} [data] data to be passed to promise resolve func.
* @return {Promise<{ data: any, result: string[] }>} Promise if resolved it will contain the data that was passed to the fn and the cmd result
*/
export function removeVolume(mountPath: string, name: string, groupName: string, physicalVolumeLocation: string, data?: any): Promise<{
    data: any;
    result: string[];
}>;
/**
 * @param {string} groupName name of the volume group
 * @return {Promise<{ data: any, result: string }>} Promise if resolved it will contain the data that was passed to the fn and the cmd result
 */
export function removeVolumeGroup(groupName: string): Promise<{
    data: any;
    result: string;
}>;
