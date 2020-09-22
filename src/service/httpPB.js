import protobuf from 'protobufjs';
import _protoRoot from '../proto/biz-proto/index';

async function $httpPB(options = {}, config = {}) {
  const lookupTypePathResponse = config['PB_LOOK_TYPE_PATH_RESPONSE'],
        lookupTypePathRequest = config['PB_LOOK_TYPE_PATH_REQUEST'],
        tokenRequired = config['TOKEN_REQUIRED'],
        errAction = config['ERROR_ACTION']; // 异常处理
  // const protoModule = get(config, 'PROTO_MODULE') // 异常处理
  const protoRoot = _protoRoot;
  const errorMessage = (msg) => {
    if (errAction === 'message') {
      // message.error(msg)
     }
  };
  const requestBody = transformReqeustFactory(protoRoot, lookupTypePathRequest)(options.data || {});
  console.log(requestBody)
  const { url, method = 'GET', headers = {} } = options;
  const headers2 = tokenRequired ? {
    ...{
      'Content-Type': 'application/x-protobuf',
      // 'Authorization': util.cookies.get('token')
    },
    ...headers
    } : {
    ...{
      'Content-Type': 'application/x-protobuf',
      'Authorization': 'elIuFgmrgycjaZbD'
    },
    ...headers
  };
  const fetchParams = {
    method,
    'responseType': 'arraybuffer',
    headers: headers2
  };

  if (method !== 'GET') {
    fetchParams.body = requestBody;
  }

 return new Promise((resolve, reject) => {
    fetch(
      url,
      fetchParams
      ).then(async (res) => {
      const { status: httpStatus } = res
      if (httpStatus === 200) {
        try {
          // 注意：res返回的是一个arrayBuffer
          const resData = await res.arrayBuffer();
          const resObj = transformResponseFactory(protoRoot, lookupTypePathResponse)(resData);
          console.log('反序列化########## ' + lookupTypePathResponse, resObj);

          const { errorMsg, errorCode } = resObj;
          if (errorCode === 0) {
            resolve(resObj)
          } else if (10002 === errorCode) {
            // util.cookies.remove();
            // local.removeUserInfo();
            // store.dispatch(setLogin(null))
            errorMessage('未登录，请先进行登录')
            // window.location.href = '/#/login'
          } else {
            if (errorMsg.includes('AskService.Email')) {
              errorMessage('邮箱校验失败，请检查邮箱格式');
            } else {
              errorMessage(errorMsg || '接口异常，请稍后重试~');
            }
            resolve(resObj);
          }
        } catch (e) {
          errorMessage('序列化出错，请联系开发者~')
        }
      } else if (httpStatus === 401) {
        // util.cookies.remove();
        // local.removeUserInfo();
        // store.dispatch(setLogin(null))
        errorMessage('未登录，请先进行登录');
        // window.location.href = '/#/login'
      } else if (httpStatus === 404) {
        errorMessage('服务未找到(404)，请联系开发者~');
      } else {
        errorMessage('服务异常，请稍后重试~')
      }
    }, err => {
      errorMessage('网络异常，请稍后重试～')
      reject(err)
    })
  })
  
}

/**
 * 判断是否是arrayBuffer类型
 * @param {string} obj 请求体buf类型
 */
function isArrayBuffer (obj) {
  return Object.prototype.toString.call(obj) === '[object ArrayBuffer]'
}

/**
 * 请求体序列化
 * @param {string} protoRoot buf编译结果
 * @param {string} requestType 请求体buf类型
 */
function transformReqeustFactory (protoRoot, requestType) {
  /**
   * 请求参数序列化
   * @param {string} params 传递参数
   */
  const transformRequest = function (params) {
    // 非空校验
    if (!params) {
      return params
    }
    try {
      const PBMessageData = protoRoot.lookup(requestType)
      console.log('requestType', requestType, params)
      var message = PBMessageData.create(params)
      var encodedDataBuffer = PBMessageData.encode(message).finish()
      return encodedDataBuffer
    } catch (err) {
      return err
    }
  }
  return transformRequest
}

/**
 * response反序列化
 * @param {string} responseType 返回值buf类型
 */
function transformResponseFactory (protoRoot, responseType) {
  /**
   * 请求参数序列化
   * @param {string} responseData 返回数据
   */
  const transformResponse = function(responseData) {
    // 判断response是否是arrayBuffer
    if (responseData == null || !isArrayBuffer(responseData)) {
      return responseData
    }
    try {
      const buf = protobuf.util.newBuffer(responseData)
      // decode响应体
      const PBMessageResponse = protoRoot.lookup(responseType)
      const decodedResponse = PBMessageResponse.decode(buf)
      return decodedResponse
    } catch (err) {
      return err
    }
  }
  return transformResponse;
}
export const PROTO_MODULE = {
  AI_SERVICE: 'AI_SERVICE',
  ORDER: 'ORDER',
  PRODUCT: 'PRODUCT',
  USER: 'USER',
  WALL: 'WALL',

  ShopMall: 'ShopMall',
  Common: 'Common',

  BaseInfo: 'BaseInfo'
}

export default $httpPB;