export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 animate-fade-in">
      <h1 className="text-3xl font-bold text-[#1a4037] mb-2">Contact Us</h1>
      <p className="text-[#5a5a5a] mb-8">We'd love to hear from you</p>
      
      <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-8">
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="mr-4 text-[#1a4037]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-[#5a5a5a] font-medium mb-1">Email</h3>
              <p className="text-[#2c2c2c] font-medium">support@maharashtrianthaali.com</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-4 text-[#1a4037]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-[#5a5a5a] font-medium mb-1">Phone</h3>
              <p className="text-[#2c2c2c] font-medium">+91 98765 43210</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-4 text-[#1a4037]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-[#5a5a5a] font-medium mb-1">Address</h3>
              <p className="text-[#2c2c2c] font-medium">
                123 Food Street<br />
                Mumbai, Maharashtra 400001<br />
                India
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-4 text-[#1a4037]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-[#5a5a5a] font-medium mb-1">Business Hours</h3>
              <p className="text-[#2c2c2c] font-medium">
                Monday - Friday: 9:00 AM - 8:00 PM<br />
                Saturday - Sunday: 10:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



