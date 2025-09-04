import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
  );
};

export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <Skeleton className="h-6 w-48 mb-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="mt-6 space-y-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
          
        </div>
      </div>
    </div>
  );
};

export const ProjectsSkeleton: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="mb-6 flex space-x-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <div className="flex flex-wrap gap-2 mb-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-14" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-5" />
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkillsSkeleton: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="space-y-8">
        {[1, 2].map((category) => (
          <div key={category} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4].map((skill) => (
                <div key={skill} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <div className="flex space-x-1">
                      <Skeleton className="h-6 w-6" />
                      <Skeleton className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AboutSkeleton: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <Skeleton className="h-6 w-48 mb-6" />
        <Skeleton className="h-32 w-full mb-4" />
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
};

export const OwnerSkeleton: React.FC = () => {
  return(
   
     <section id="home" className=" min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-primary-50 to-accent-50 dark:from-primary-900 dark:via-primary-800 dark:to-primary-900">
         <div className="container-custom text-center">
           <div className="max-w-4xl mx-auto space-y-8">
             {/* Profile Image Placeholder */}
             <div className="mt-[100px] mx-auto w-32 h-32 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white text-4xl font-bold mb-8">
               <Skeleton className="rounded-2xl w-[128px] h-[128px]"  />
             </div>
             
             {/* Main Content */}
             <div className="space-y-6">
               <Skeleton className="text-3xl md:text-2xl font-bold text-primary-900 dark:text-primary-100">
                 
               </Skeleton>
               <Skeleton className="text-xl md:text-2xl text-primary-600 dark:text-primary-400 max-w-2xl mx-auto leading-relaxed">
                  
               </Skeleton>
               <Skeleton className="text-lg text-primary-500 dark:text-primary-300 max-w-3xl mx-auto leading-relaxed" />
                
               
             </div>
   
             {/* Call-to-Action Buttons */}
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
               <Skeleton 
                 
                 className="btn-primary text-lg px-8 py-4"
               />
                 <Skeleton className="w-5 h-5 mr-2" />
                 
               
               <Skeleton 
                  
                  
                 className="btn-secondary text-lg px-8 py-4"
               />
               
             </div>
   
             {/* Scroll Indicator */}
             <div className="pt-16">
               <Skeleton
                 
                 className="text-primary-500 dark:text-primary-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-200 animate-bounce"
               />
                
             </div>
           </div>
         </div>
       </section>
           
         
  )

}
