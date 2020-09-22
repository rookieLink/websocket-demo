/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/light";

const $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  proto: {
    options: {
      go_package: ".;proto"
    },
    nested: {
      TSSKBatchUploadImageRequest: {
        fields: {
          base64List: {
            rule: "repeated",
            type: "ImageWithBase64",
            id: 1
          }
        },
        nested: {
          ImageWithBase64: {
            fields: {
              filename: {
                type: "string",
                id: 1
              },
              imageB64: {
                type: "string",
                id: 2
              }
            }
          }
        }
      },
      TSSKBatchUploadImageResponse: {
        fields: {
          errorCode: {
            type: "uint32",
            id: 1
          },
          errorMsg: {
            type: "string",
            id: 2
          },
          urlList: {
            rule: "repeated",
            type: "ImageWithUrl",
            id: 3
          }
        },
        nested: {
          ImageWithUrl: {
            fields: {
              filename: {
                type: "string",
                id: 1
              },
              imageUrl: {
                type: "string",
                id: 2
              }
            }
          }
        }
      },
      TSSKLabelSubmitRequest: {
        fields: {
          labelList: {
            rule: "repeated",
            type: "ImageLabelData",
            id: 1
          }
        },
        nested: {
          ImageLabelData: {
            fields: {
              imageUrl: {
                type: "string",
                id: 1
              },
              labelData: {
                type: "string",
                id: 2
              }
            }
          }
        }
      },
      TSSKLabelSubmitResponse: {
        fields: {
          errorCode: {
            type: "uint32",
            id: 1
          },
          errorMsg: {
            type: "string",
            id: 2
          }
        }
      },
      TSSKUploadImageRequest: {
        fields: {
          imageB64: {
            type: "string",
            id: 1
          }
        }
      },
      TSSKUploadImageResponse: {
        fields: {
          errorCode: {
            type: "uint32",
            id: 1
          },
          errorMsg: {
            type: "string",
            id: 2
          },
          imageUrl: {
            type: "string",
            id: 3
          }
        }
      },
      TSSKUploadCSVRequest: {
        fields: {}
      },
      TSSKUploadCSVResponse: {
        fields: {
          errorCode: {
            type: "uint32",
            id: 1
          },
          errorMsg: {
            type: "string",
            id: 2
          }
        }
      },
      TSSKLabelCountRequest: {
        fields: {}
      },
      TSSKLabelCountResponse: {
        fields: {
          errorCode: {
            type: "uint32",
            id: 1
          },
          errorMsg: {
            type: "string",
            id: 2
          },
          count: {
            type: "int64",
            id: 3
          }
        }
      }
    }
  }
});

export { $root as default };
