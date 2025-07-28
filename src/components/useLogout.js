const useLogout = () => {
  return () => {
    localStorage.removeItem('token');
    // optionally remove other auth-related keys
  };
};

export default useLogout;
