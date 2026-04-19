import { Leaf } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="glass-effect border-t border-white/10 mt-20">
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <Leaf className="text-green-400" size={24} />
              AgriAI
            </div>
            <p className="text-gray-300">Empowering farmers with AI technology</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-green-400">Features</a></li>
              <li><a href="#" className="hover:text-green-400">Pricing</a></li>
              <li><a href="#" className="hover:text-green-400">Security</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-green-400">About</a></li>
              <li><a href="#" className="hover:text-green-400">Blog</a></li>
              <li><a href="#" className="hover:text-green-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-green-400">Privacy</a></li>
              <li><a href="#" className="hover:text-green-400">Terms</a></li>
              <li><a href="#" className="hover:text-green-400">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400">
          <p>&copy; 2024 AgriAI. All rights reserved. Made with ❤️ for farmers.</p>
        </div>
      </div>
    </footer>
  )
}
