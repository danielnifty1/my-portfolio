"use client"

import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { Button } from './ui/button'

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/danielnifty1', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/daniel-chigozie', icon: Linkedin },
  { name: 'Twitter', href: 'https://x.com/danielnifty', icon: Twitter },
  { name: 'Email', href: 'mailto:danielobichere@gmail.com', icon: Mail },
]

export function Footer() {
  return (
    <footer className="bg-primary-50 dark:bg-primary-800 border-t border-primary-200 dark:border-primary-700">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-primary-600 dark:text-primary-400">
              © 2025 Obichere Chigozie Daniel. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="sm"
                  // asChild
                  className="p-2 text-primary-600 dark:text-primary-400 hover:text-accent-600 dark:hover:text-accent-400"
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
