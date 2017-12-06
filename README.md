# NODE LVM

Install:
```
npm install node-lvm
```

Usage:
```js
var lvm = require('node-lvm');

//1. Create (format) new physical volume (PV)
//Storage devices must be formated as a physical volume before it can participate in the LVM infrastructure
lvm.createPhysicalVolume('/dev/std2', { some: 'data' }).then((data) => console.log(data.some));

//2. Create volume group
//Agregate the physical volume(s) into a single contiguous pool of storage - Volume group (VG)
lvm.createVolumeGroup('volume_group_name', '/dev/std2', { some: 'data' }).then((data) => console.log(data.some));

//3. Create Logical Volume 30GB (LV)
lvm.createLogicalVolume('lv_name', 30, 'volume_group_name', { some: 'data' }).then((data) => console.log(data.some));

//4. Format LV with EXT3
lvm.formatLogicalVolume('lv_name', 'volume_group_name', 'ext3', '/dev', { some: 'data' }).then((data) => console.log(data.some));

//5. Mount LV
lvm.mountVolume('lv_name', 'volume_group_name', 'ext3', '/mnt/mount_point_name', '/dev', { some: 'data' }).then((data) => console.log(data.some));

//6. Extend LV with 5GB
lvm.extendVolume('lv_name', 'volume_group_name', '/dev', 5, { some: 'data' }).then((data) => console.log(data.some));

//7. Reduce LV with 5GB
lvm.reduceVolume('lv_name', 'volume_group_name', '/dev', 5, { some: 'data' }).then((data) => console.log(data.some));

//8. Remove LV
lvm.removeVolume('/mnt/mount_point_name', 'lv_name', 'volume_group_name', '/dev', { some: 'data' }).then((data) => console.log(data.some));
```