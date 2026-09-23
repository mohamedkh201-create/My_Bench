import { FrappeProvider } from 'frappe-react-sdk'
import Sidebar from './components/layout/Sidebar' // استيراد السايد بار
import './index.css'

function App() {
  return (
    <FrappeProvider enableSocket={false}>
      {/* حاوية رئيسية تأخذ كامل الشاشة وتقسمها أفقياً */}
      <div className="flex h-screen w-screen overflow-hidden bg-[#F4F5F8]">
        
        {/* السايد بار على اليسار */}
        <Sidebar />

        {/* محتوى الصفحة الرئيسي على اليمين */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {/* هنا سنضع الهيدر ومحتويات صفحة الطلبات لاحقاً */}
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800">Main page ....</h1>
          </div>
        </main>

      </div>
    </FrappeProvider>
  )
}

export default App
