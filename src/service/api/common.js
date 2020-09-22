import request from '../httpPB';

const baseUrl = 'https://sukou.turingsenseai.com';

// 上传图片信息
//获取图片url    POST  /uploadImage imgB64
export const uploadImageFromBase64 = ( base64Image ) => {
  console.log(base64Image);
  return request({
    url: `${baseUrl}/uploadImage`,
    method: 'POST',
    data: {
      imageB64: base64Image
    }
  }, {
    PB_LOOK_TYPE_PATH_REQUEST: 'proto.TSSKUploadImageRequest',
    PB_LOOK_TYPE_PATH_RESPONSE: 'proto.TSSKUploadImageResponse',
    ERROR_ACTION: 'message',
    // PROTO_MODULE: PROTO_MODULE.AI_SERVICE
    // TOKEN_REQUIRED: true
  })
}

