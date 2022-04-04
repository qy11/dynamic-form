import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import OSS from "ali-oss";
import { getStsToken } from "../services/fileUpload";
import { setNanoId } from "../utils/nanoId";


/**
 * @param service
 * @param options
 */
const useUploadOss = ({ options = {} } = {}) => {
  const { prefix = "upload_oss_", onOk } = options;
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  // 第一次modal弹窗调用后端接口获取阿里云签名参数
  useEffect(() => {
    setLoading(true);
    getStsToken()
      .then(res => {
        setLoading(false);
        if (!res) {
          return;
        }
        setClient(new OSS({ ...res }));
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // 上传至阿里云oss服务
  const upload = useCallback(
    blobFile => {
      const put = () => {
        client
          .put(`${prefix}${setNanoId({ len: 15 })}.jpg`, blobFile)
          .then(res => {
            setLoading(false);
            if (res && res.name && res.url) {
              setUrl(res.url);
              if (typeof onOk === "function") {
                onOk(res.url);
              }
              return;
            }
            message.error("阿里云OSS服务异常，请重试");
          })
          .catch(err => {
            message.error(err || "阿里云OSS服务异常，请重试");
            setLoading(false);
          });
      };

      setLoading(true);
      if (!client) {
        getStsToken()
          .then(res => {
            setLoading(false);
            if (!res) {
              return;
            }
            setClient(new OSS({ ...res }));
            put();
          })
          .catch(() => {
            setLoading(false);
          });
        return;
      }

      put();
    },
    [setUrl, client, onOk]
  );

  return { uploadUrl: url, loading, upload };
};

export default useUploadOss;
