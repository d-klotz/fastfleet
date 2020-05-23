export default status => {
  if (status === 'PENDING') {
    return 'PENDING';
  }

  if (status === 'WITHDRAWN') {
    return 'WITHDRAWN';
  }

  if (status === 'DELIVERED') {
    return 'DELIVERED';
  }

  if (status === 'CANCELED') {
    return 'CANCELED';
  }

  return null;
};
