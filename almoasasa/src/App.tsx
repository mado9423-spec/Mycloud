import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 direction-rtl">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold text-primary-700">
            مرحباً بك في المؤسسة
          </h1>
          <p className="text-xl text-gray-600">
            تطبيق ويب عربي RTL متجاوب
          </p>
          <div className="space-y-4">
            <button
              onClick={() => setCount((count) => count + 1)}
              className="px-6 py-3 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-colors"
            >
              عدد الضغطات: {count}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
