import { useState, useEffect } from 'react'
import { Radar, Search, Menu, X, User, LogOut, Settings, ChevronDown, Sun, Moon, Compass, UserCircle, Globe } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useTranslation } from 'react-i18next'

function Navbar({ onStart, showResults, onLoginClick, onLogout, onSearchClick, onProfileClick }) {
  const { theme, toggleTheme, user } = useStore()
  const { t, i18n } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
      scrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-md border-b border-gray-100 dark:border-gray-800' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-blue-900/30">
              <Radar className="w-6 h-6 text-[#2563EB] dark:text-blue-400" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-[#1F2329] dark:text-white">企服雷达</span>
              <span className="text-[#64748B] dark:text-gray-400 ml-1 text-sm hidden sm:inline">PolicyHunter</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={onSearchClick}
              className="flex items-center space-x-2 transition-colors relative group text-[#64748B] hover:text-[#2563EB] dark:text-gray-400 dark:hover:text-blue-400"
            >
              <Compass className="w-4 h-4" />
              <span>{t('policySearch')}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span>
            </button>
            {!showResults ? (
              <>
                <a href="#features" className="transition-colors relative group text-[#64748B] hover:text-[#2563EB] dark:text-gray-400 dark:hover:text-blue-400">
                  {t('features')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#about" className="transition-colors relative group text-[#64748B] hover:text-[#2563EB] dark:text-gray-400 dark:hover:text-blue-400">
                  {t('about')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </>
            ) : (
              <button 
                onClick={() => onStart && onStart()}
                className="transition-colors relative group text-[#64748B] hover:text-[#2563EB] dark:text-gray-400 dark:hover:text-blue-400"
              >
                {t('home')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span>
              </button>
            )}
            <button 
              onClick={onStart}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>{showResults ? t('start') : t('start')}</span>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              title={theme === 'light' ? t('darkMode') : t('lightMode')}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh')}
              className="p-2 rounded-lg transition-colors text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              title={t('language')}
            >
              <Globe className="w-5 h-5" />
            </button>
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
                    <User className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-[#111827] dark:text-white">{user.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''} text-[#64748B] dark:text-gray-400`} />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl shadow-lg border py-2 z-50 animate-in slide-in-from-top-2 duration-200 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
                    <button 
                      onClick={() => {
                        onProfileClick()
                        setIsUserMenuOpen(false)
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-left text-sm transition-colors text-[#64748B] hover:text-[#111827] hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      <UserCircle className="w-4 h-4" />
                      <span>{t('profile')}</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-left text-sm transition-colors text-[#64748B] hover:text-[#111827] hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
                      <Settings className="w-4 h-4" />
                      <span>{t('settings')}</span>
                    </button>
                    <div className="border-t my-2 border-gray-100 dark:border-gray-700"></div>
                    <button 
                      onClick={() => {
                        onLogout()
                        setIsUserMenuOpen(false)
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="font-medium transition-colors text-[#64748B] hover:text-[#2563EB] dark:text-gray-400 dark:hover:text-blue-400"
              >
                {t('login')}
              </button>
            )}
          </div>

          <button 
            className="md:hidden p-2 text-[#1F2329] dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t animate-in slide-in-from-top duration-300 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800">
          <div className="px-4 py-4 space-y-3">
            <button 
              onClick={() => {
                onSearchClick()
                setIsMenuOpen(false)
              }}
              className="flex items-center space-x-2 py-2 transition-colors text-[#64748B] hover:text-[#2563EB] dark:text-gray-400 dark:hover:text-blue-400"
            >
              <Compass className="w-4 h-4" />
              <span>{t('policySearch')}</span>
            </button>
            
            {!showResults ? (
              <>
                <a href="#features" className="block py-2 transition-colors text-[#64748B] hover:text-[#2563EB] dark:text-gray-400 dark:hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>{t('features')}</a>
                <a href="#about" className="block py-2 transition-colors text-[#64748B] hover:text-[#2563EB] dark:text-gray-400 dark:hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>{t('about')}</a>
              </>
            ) : (
              <button 
                onClick={() => {
                  onStart && onStart()
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left py-2 transition-colors text-[#64748B] hover:text-[#2563EB] dark:text-gray-400 dark:hover:text-blue-400"
              >
                {t('home')}
              </button>
            )}

            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 py-2 transition-colors text-[#64748B] hover:text-[#2563EB] dark:text-gray-400 dark:hover:text-blue-400"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span>{theme === 'light' ? t('darkMode') : t('lightMode')}</span>
            </button>
            
            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh')}
              className="flex items-center space-x-2 py-2 transition-colors text-[#64748B] hover:text-[#2563EB] dark:text-gray-400 dark:hover:text-blue-400"
            >
              <Globe className="w-4 h-4" />
              <span>{t('language')}</span>
            </button>
            
            {user ? (
              <div className="border-t pt-4 border-gray-100 dark:border-gray-800">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
                    <User className="w-5 h-5 text-[#2563EB] dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-[#111827] dark:text-white">{user.name}</p>
                    <p className="text-xs text-[#64748B] dark:text-gray-400">{user.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    onProfileClick()
                    setIsMenuOpen(false)
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2 transition-colors text-[#64748B] hover:text-[#2563EB] dark:text-gray-400 dark:hover:text-blue-400"
                >
                  <UserCircle className="w-4 h-4" />
                  <span>{t('profile')}</span>
                </button>
                <button 
                  onClick={() => {
                    onLogout()
                    setIsMenuOpen(false)
                  }}
                  className="w-full flex items-center justify-center space-x-2 text-red-500 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('logout')}</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  onLoginClick()
                  setIsMenuOpen(false)
                }}
                className="w-full font-medium py-2 text-[#2563EB] dark:text-blue-400"
              >
                {t('login')} / {t('register')}
              </button>
            )}
            
            <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 w-full flex items-center justify-center space-x-2">
              <Search className="w-5 h-5" />
              <span>{t('start')}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar