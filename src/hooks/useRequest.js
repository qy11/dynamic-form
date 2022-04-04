import { useState, useEffect } from "react";

/**
 * @param service
 * @param initParams
 * @returns {{handleQuery: handleQuery, setLoading: React.Dispatch<React.SetStateAction<boolean>>, handlePaginationChange: handlePaginationChange, pageInfo: {}, onTabChange: onTabChange, params: unknown, loading: boolean, list: *[]}}
 */
const useRequest = (
  service,
  { initParams = { page: 1, pageSize: 10 } } = {}
) => {
  // 状态管理
  const [params, setParams] = useState(initParams);

  const [pageInfo, setPageInfo] = useState({});
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    service(params)
      .then(({ content, totalElements }) => {
        setList(content);
        setPageInfo({
          page: params.page,
          pageSize: params.pageSize,
          totalElements
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [params]);

  const handleQuery = ({ queries = {}, page = 1, pageSize = 10 }) => {
    setParams({
      ...params,
      page,
      pageSize,
      ...queries
    });
  };

  // 分页器点击
  const handlePaginationChange = (page, pageSize) => {
    setParams({
      ...params,
      page,
      pageSize
    });
  };

  const onTabChange = status => {
    if (params.taskStatus !== status) {
      setParams({
        ...params,
        taskStatus: status,
        page: 1
      });
    }
  };

  return {
    params,
    setParams,
    pageInfo,
    loading,
    setLoading,
    list,
    handleQuery,
    handlePaginationChange,
    onTabChange
  };
};

export default useRequest;
