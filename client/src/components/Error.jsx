const Error = () => {
  return (
    <div className='error'>
      <div>
        <p>Message: {error.message || "Something went wrong"}</p>
        <button type='button'>&times;</button>
      </div>
    </div>
  );
};

export default Error;
