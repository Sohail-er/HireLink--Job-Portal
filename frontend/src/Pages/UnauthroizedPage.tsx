import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate=useNavigate();
  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center min-h-screen">
      <div className="text-center p-8 bg-white/90 backdrop-blur-sm border border-purple-200 rounded-lg shadow-lg max-w-md">
        <h1 className="text-4xl font-bold text-red-500 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">Unauthorized Access</h2>
        <p className="text-gray-600 mb-6">
          Sorry, you don’t have permission to view this page.
        </p>
        <Button className="!bg-gradient-to-r !from-purple-500 !to-pink-500 !text-white hover:!from-purple-600 hover:!to-pink-600 !border-0" onClick={()=>navigate('/')}>
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
