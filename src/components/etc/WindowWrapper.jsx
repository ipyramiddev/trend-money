const WindowWrapper = ({ children }) => {
  return (
    <div className="w-full min-w-full">
      <div className="mockup-window border-blue  px-6 py-4  mockup-window-outline border-4 shadow-xl  shadow-blue  w-full pt-2 m-3">
        {children.map((child, index) => {
          return (
            <div className="mockup-window-content" key={index}>
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WindowWrapper;
