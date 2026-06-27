import { Radar, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react'

function Footer() {
  const links = {
    product: [
      { name: '功能介绍', href: '#features' },
      { name: '政策库', href: '#' },
      { name: '定价方案', href: '#' },
      { name: 'API 文档', href: '#' }
    ],
    company: [
      { name: '关于我们', href: '#about' },
      { name: '新闻动态', href: '#' },
      { name: '加入我们', href: '#' },
      { name: '联系方式', href: '#' }
    ],
    support: [
      { name: '帮助中心', href: '#' },
      { name: '常见问题', href: '#' },
      { name: '服务条款', href: '#' },
      { name: '隐私政策', href: '#' }
    ]
  }

  return (
    <footer className="py-16 px-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <Radar className="w-6 h-6 text-[#2563EB]" />
              </div>
              <span className="text-xl font-semibold">
                <span className="text-gray-900 dark:text-white">企服雷达</span>
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 max-w-sm leading-relaxed">
              让政策红利惠及每一家企业。智能匹配政府补贴政策，助力企业发展。
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>contact@policyhunter.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>400-888-8888</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>北京市朝阳区科技园区</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">产品</h4>
            <ul className="space-y-3">
              {links.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-[#2563EB] transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">公司</h4>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-[#2563EB] transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">支持</h4>
            <ul className="space-y-3">
              {links.support.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-[#2563EB] transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 企服雷达 PolicyHunter. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-[#2563EB] transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-[#2563EB] transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-[#2563EB] transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
