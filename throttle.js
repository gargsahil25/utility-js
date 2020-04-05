'use strict';

const processBatchesUntilFinished = async (fn, waitTime, batchSize) => {
    let startDate = new Date().getTime();
    let count = await fn(batchSize);
    console.info("Method processBatchesUntilFinished, Total Count = " + count + " First batch size "+ batchSize + " time taken  " + (new Date().getTime() - startDate));
    while (count > batchSize) {
        await new Promise((resolve, reject) => {
            setTimeout(async () => {
                startDate = new Date().getTime();
                count = await fn(batchSize);
                console.info("Method processBatchesUntilFinished Inside loop, Pending Count " + count + " batch size "+ batchSize + " time taken  " + (new Date().getTime() - startDate));
                resolve();
            }, waitTime);
        });
    }
}

const processSlowly = async (dataList, callback, waitTime) => {
    let totalCount = dataList.length;
    for(let index = totalCount-1; index >= 0; index--) {
        let data = dataList[index];
        await new Promise((resolve, reject) => {
            setTimeout(async () => {
                await callback(data);
                resolve();
            }, waitTime);
        });
        var count  = totalCount - index;
        console.info("Method processSlowly loop count " + count + " out of " + totalCount);
    }
}


const ThrottleUtils = {
    processBatchesUntilFinished,
    processSlowly
}

export default ThrottleUtils;
