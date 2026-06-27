import { useState, useEffect, lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { useStore } from './store/useStore'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import Toast from './components/Toast'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'

const Results = lazy(() => import('./components/Results'))
const PolicyModal = lazy(() => import('./components/PolicyModal'))
const MaterialsModal = lazy(() => import('./components/MaterialsModal'))
const DiagnosisModal = lazy(() => import('./components/DiagnosisModal'))
const SearchPage = lazy(() => import('./components/SearchPage'))
const ProfilePage = lazy(() => import('./components/ProfilePage'))
const CompareModal = lazy(() => import('./components/CompareModal'))
const PolicyChart = lazy(() => import('./components/charts/PolicyChart'))

const queryClient = new QueryClient()

function AppContent() {
  const { theme, login, logout, showToast, compareList } = useStore()
  
  useEffect(() => {
    const rootElement = document.documentElement
    if (theme === 'dark') {
      rootElement.classList.add('dark')
    } else {
      rootElement.classList.remove('dark')
    }
  }, [theme])
  
  const [currentPage, setCurrentPage] = useState('home')
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showDiagnosis, setShowDiagnosis] = useState(false)
  const [selectedPolicy, setSelectedPolicy] = useState(null)
  const [showMaterials, setShowMaterials] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showCompareModal, setShowCompareModal] = useState(false)

  const handleStart = async (name) => {
    setCompanyName(name || '')
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setIsLoading(false)
    setShowDiagnosis(true)
  }

  const handleViewReport = () => {
    setShowDiagnosis(false)
    setShowResults(true)
    setCurrentPage('results')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCloseDiagnosis = () => {
    setShowDiagnosis(false)
  }

  const handleGoHome = () => {
    setShowResults(false)
    setShowDiagnosis(false)
    setSelectedPolicy(null)
    setShowMaterials(false)
    setCompanyName('')
    setCurrentPage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogin = (userData) => {
    login(userData)
    showToast('登录成功', 'success')
  }

  const handleRegister = (userData) => {
    login(userData)
    showToast('注册成功', 'success')
  }

  const handleLogout = () => {
    logout()
    showToast('已退出登录', 'info')
    setCurrentPage('home')
  }

  const handleLoginClick = () => {
    setShowLoginModal(true)
  }

  const handlePolicyClick = (policy) => {
    setSelectedPolicy(policy)
  }

  const handleCloseModal = () => {
    setSelectedPolicy(null)
  }

  const handleGenerateMaterials = () => {
    setShowMaterials(true)
    setSelectedPolicy(null)
  }

  const handleCloseMaterials = () => {
    setShowMaterials(false)
  }

  const handleSearchClick = () => {
    setCurrentPage('search')
    setShowResults(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleProfileClick = () => {
    setCurrentPage('profile')
    setShowResults(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getPageTitle = () => {
    switch (currentPage) {
      case 'search': return '政策搜索 - 企服雷达'
      case 'profile': return '个人中心 - 企服雷达'
      case 'results': return '匹配结果 - 企服雷达'
      default: return '企服雷达 - 智能政策匹配平台'
    }
  }

  const getPageDescription = () => {
    switch (currentPage) {
      case 'search': return '搜索最新政策，找到最适合您的政策支持'
      case 'profile': return '管理您的收藏和浏览历史'
      case 'results': return '查看您的政策匹配结果报告'
      default: return '企服雷达是一款智能政策匹配平台，帮助企业快速找到适合的政策支持'
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="keywords" content="政策,政策匹配,企业政策,政府补贴,政策查询" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>P</text></svg>" />
      </Helmet>
      
      <Navbar 
        onStart={handleGoHome} 
        showResults={showResults}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
        onSearchClick={handleSearchClick}
        onProfileClick={handleProfileClick}
      />
      
      <Toast />
      
      {isLoading && <LoadingScreen />}
      
      <Suspense fallback={<div className="flex items-center justify-center h-64"><LoadingScreen /></div>}>
        {currentPage === 'home' && !showResults && (
          <>
            <Hero onSubmit={handleStart} />
            <Features />
            <PolicyChart />
            <About />
          </>
        )}
        
        {currentPage === 'search' && (
          <SearchPage onPolicyClick={handlePolicyClick} />
        )}
        
        {currentPage === 'profile' && (
          <ProfilePage onPolicyClick={handlePolicyClick} onLoginClick={handleLoginClick} />
        )}
        
        {currentPage === 'results' && showResults && (
          <Results 
            companyName={companyName}
            onPolicyClick={handlePolicyClick}
            onGenerateMaterials={handleGenerateMaterials}
            onCompare={() => setShowCompareModal(true)}
          />
        )}
      </Suspense>
      
      {currentPage === 'home' && <Footer />}
      
      <Suspense fallback={null}>
        {selectedPolicy && (
          <PolicyModal 
            policy={selectedPolicy} 
            onClose={handleCloseModal}
            onGenerateMaterials={handleGenerateMaterials}
          />
        )}
        
        {showMaterials && (
          <MaterialsModal 
            onClose={handleCloseMaterials}
            policy={selectedPolicy}
          />
        )}
        
        {showDiagnosis && (
          <DiagnosisModal 
            companyName={companyName}
            onViewReport={handleViewReport}
            onClose={handleCloseDiagnosis}
          />
        )}
        
      </Suspense>
      
      {showLoginModal && (
        <LoginModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setShowLoginModal(false)
            setShowRegisterModal(true)
          }}
        />
      )}
      
      {showRegisterModal && (
        <RegisterModal 
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          onRegister={handleRegister}
          onSwitchToLogin={() => {
            setShowRegisterModal(false)
            setShowLoginModal(true)
          }}
        />
      )}
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
