export const Toast = ({toasts, onClose}) => (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className={`px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out slide-in
                        ${toast.type === 'success' ? 'bg-green-500' : ''}
                        ${toast.type === 'error' ? 'bg-red-500' : ''}
                        ${toast.type === 'warning' ? 'bg-yellow-500' : ''}
                        ${toast.type === 'info' ? 'bg-sky-500' : ''}
                        text-white min-w-[200px] flex items-center justify-between hover:scale-102`}
                >
                    <p>{toast.message}</p>
                    <button
                        onClick={()=> onClose(toast)}
                        className="ml-3 text-white hover:text-gray-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );

    export default Toast;