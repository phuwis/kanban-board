export const pagination = (data: any, params?: any) => {
  const paginate = {
    current: params && params.page ? Number(params.page) : 1,
    pageSize: params && params.limit ? Number(params.limit) : 10,
    total: data && data.totalItems,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} Items`,
  };

  return paginate;
};
