const {S3Client, GetObjectCommand} = require('@aws-sdk/client-s3');

const config = {
    region: 'us-east-1',
    accessKeyId: 'ASIAQFVOSJ577B3NKWMX',
    secretAccessKey: 'TtYRjeEQS0H51UrGUHBadn+8+4IKp57iLc8TC25n',
    sessionToken: 'IQoJb3JpZ2luX2VjEJP//////////wEaCXVzLWVhc3QtMSJGMEQCICqnVWnyA8RoUjPJVWzqXDYDN0Y+uypMYXwPbVqXPtBHAiBw4+aknerWq0s8I/rvEuVEECCb86eYgATCZNXEFXxNzSqgAwgrEAQaDDAxMjE3NzI2NDUxMSIM391n+tYMmZfXuuiCKv0CYvJv9A6k5UmpVzHVOmW1Cbtjfh7iiD0Qcqt1UsK9wo0TTQsGMf7UJeBFE1jwdPS/AiUgsCzKyDa/4a0N8jm6X514SwjvQna2MS+aEPxMBfpFpgoraDkx/WwZZuU4mYIdEgpAPSe9weHknlCD1ngmuPF3jVfnYPA1N0mHGwWPUqI7X4cxJZ/pUMMPzhleyRTzi/fEjNoQPKY+15hPCh4m9uNGtD5x1HTni5insU2D3zzt0GgG4l5JEVaPsaJ2jOYnv3RVrkCB3cCB1dLJIdNUODjn5NmDddeVPXjP8aVTk2vs03zX2SWlHcmyLpaMWFu7PrBvZEXDDKwjDSBiXsJNA1/wziMH3FjVD0TdstkQ+0nyfaJBHX5V96E6qH0T6bSdvaQ/rT+iN9VUJ95mhe/Kf7Vuub2AXvkNcTgwdUWzjRxS+yvqq5s1wyHOTViw1HrTJf8++enilP8Py6gd3xoZhOJec8OpiOY+iUVMpjW1mC6wkJ8MBqeX+rjShAqDMJi9/qUGOqcB6ZYjum4329mPEgkUW4odVJTWsL2mYLzKCQ9CljW83IWpsE0Z2oUT6DCCPyh5TdRQ9eijlYbBKyW+nPLEona8VkTiltx9aRLulGCjnffajRANcPyE6EJwO0vFWLd60G2IoVESJ9kYujjC/2zZvTk/net8Ug6p2qi3o02G1C+rZUr4N/EqzcYunEDtq40CQGZDIftllOTu4/CSb1n5pvbfX9DG5YolVqo=',
    bucket: 's3-use1-ap-pe-products-client-europa-website-d',
    dirInBucket: 'teams-notifier-files'
}
const s3Client = new S3Client({ region: config.region, credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    sessionToken: config.sessionToken
}});

async function getS3File(filename) {
    try {
        const res = await s3Client.send(new GetObjectCommand({
            Bucket: config.bucket,
            Key: `${config.dirInBucket}/${filename}`
        }));
        return {body: res.Body, contentLength: res.ContentLength, contentEncoding: res.ContentEncoding};
    } catch(error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getS3File
}