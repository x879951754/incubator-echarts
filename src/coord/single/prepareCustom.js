import {util as zrUtil} from 'zrender';

function dataToCoordSize(dataSize, dataItem) {
    // dataItem is necessary in log axis.
    var axis = this.getAxis();
    var val = dataItem instanceof Array ? dataItem[0] : dataItem;
    var halfSize = (dataSize instanceof Array ? dataSize[0] : dataSize) / 2;
    return axis.type === 'category'
        ? axis.getBandWidth()
        : Math.abs(axis.dataToCoord(val - halfSize) - axis.dataToCoord(val + halfSize));
}

export default function (coordSys) {
    var rect = coordSys.getRect();

    return {
        coordSys: {
            type: 'singleAxis',
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height
        },
        api: {
            coord: zrUtil.bind(coordSys.dataToPoint, coordSys),
            size: zrUtil.bind(dataToCoordSize, coordSys)
        }
    };
}
