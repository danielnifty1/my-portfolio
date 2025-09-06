"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Twitter, Mail, Send, CheckCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/danielnifty1', icon: Github, color: 'hover:text-gray-900 dark:hover:text-gray-100' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/daniel-chigozie', icon: Linkedin, color: 'hover:text-blue-600 dark:hover:text-blue-400' },
  { name: 'Twitter', href: 'https://x.com/danielnifty', icon: Twitter, color: 'hover:text-blue-400 dark:hover:text-blue-300' },
  { name: 'Email', href: 'mailto:danielobichere@gmail.com', icon: Mail, color: 'hover:text-red-600 dark:hover:text-red-400' },
]

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after successful submission
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="section-padding bg-primary-50 dark:bg-primary-800">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="p-8 bg-white dark:bg-primary-900 rounded-2xl shadow-sm border border-primary-200 dark:border-primary-700">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-primary-900 dark:text-primary-100 mb-4">
                Message Sent Successfully!
              </h2>
              <p className="text-primary-600 dark:text-primary-400 mb-6">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="btn-primary"
              >
                Send Another Message
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="section-padding bg-primary-50 dark:bg-primary-800">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 dark:text-primary-100 mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-primary-600 dark:text-primary-400 max-w-2xl mx-auto">
              I'm always interested in new opportunities, collaborations, or just a friendly chat about technology.
            </p>
            <div className="w-24 h-1 bg-accent-600 mx-auto mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary-900 dark:text-primary-100">
                Send Me a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors duration-200 ${
                      errors.name 
                        ? 'border-red-300 bg-red-50 dark:bg-red-900/20' 
                        : 'border-primary-300 dark:border-primary-600 bg-white dark:bg-primary-800'
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors duration-200 ${
                      errors.email 
                        ? 'border-red-300 bg-red-50 dark:bg-red-900/20' 
                        : 'border-primary-300 dark:border-primary-600 bg-white dark:bg-primary-800'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors duration-200 resize-none ${
                      errors.message 
                        ? 'border-red-300 bg-red-50 dark:bg-red-900/20' 
                        : 'border-primary-300 dark:border-primary-600 bg-white dark:bg-primary-800'
                    }`}
                    placeholder="Tell me about your project, opportunity, or just say hello!"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-primary-900 dark:text-primary-100 mb-6">
                  Let's Connect
                </h3>
                <p className="text-primary-600 dark:text-primary-400 leading-relaxed mb-6">
                  I'm currently available for freelance work, full-time positions, and interesting project collaborations. 
                  Feel free to reach out through any of these channels.
                </p>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-4">
                  Follow Me
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-3 p-4 rounded-lg border border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-800 hover:shadow-md transition-all duration-200 ${social.color}`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{social.name}</span>
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Additional Info */}
              <div className="p-6 bg-white dark:bg-primary-900 rounded-xl border border-primary-200 dark:border-primary-700">
                <h4 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-3">
                  Quick Facts
                </h4>
                <div className="space-y-2 text-sm text-primary-600 dark:text-primary-400">
                  <p>📍 Based in Your City, Country</p>
                  <p>⏰ Available for new opportunities</p>
                  <p>💼 Open to remote and hybrid work</p>
                  <p>🚀 Quick response time (usually within 24 hours)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
