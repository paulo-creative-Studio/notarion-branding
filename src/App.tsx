import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { ServicesSection } from './components/ServicesSection';
import { SegmentsSection } from './components/SegmentsSection';
import { PackagesSection } from './components/PackagesSection';
import { MaintenanceSection } from './components/MaintenanceSection';
import { BenefitsSection } from './components/BenefitsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { DifferentialsSection } from './components/DifferentialsSection';
import { ConversionCtaSection } from './components/ConversionCtaSection';
import { Footer } from './components/Footer';

// Modals
import { FreeDemoModal } from './components/FreeDemoModal';
import { ScheduleCallModal } from './components/ScheduleCallModal';
import { PackageModal } from './components/PackageModal';
import { WhatsAppAssistant } from './components/WhatsAppAssistant';

import { PackageTier } from './types';

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageTier | null>(null);
  const [demoInitialSegment, setDemoInitialSegment] = useState<string | undefined>(undefined);
  const [demoInitialProject, setDemoInitialProject] = useState<string | undefined>(undefined);

  const handleOpenDemoModal = (segmentOrProject?: string) => {
    if (segmentOrProject) {
      if (['gastronomia', 'lojas', 'comercio', 'profissionais', 'personalizado'].includes(segmentOrProject)) {
        setDemoInitialSegment(segmentOrProject);
      } else {
        setDemoInitialProject(segmentOrProject);
      }
    } else {
      setDemoInitialSegment(undefined);
      setDemoInitialProject(undefined);
    }
    setIsDemoModalOpen(true);
  };

  const handleOpenCallModal = () => {
    setIsCallModalOpen(true);
  };

  const handleSelectPackage = (pkg: PackageTier) => {
    setSelectedPackage(pkg);
  };

  return (
    <div className="min-h-screen bg-[#090a0c] text-zinc-100 flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#fef08a]">
      {/* 3-Zone Top Navigation */}
      <Navbar 
        onOpenDemoModal={() => handleOpenDemoModal()} 
        onOpenCallModal={handleOpenCallModal} 
      />

      <main className="flex-1">
        {/* Hero with multi-device mockup & interactive simulator */}
        <Hero 
          onOpenDemoModal={() => handleOpenDemoModal()} 
          onOpenCallModal={handleOpenCallModal} 
        />

        {/* The Problem vs The Notarion Solution */}
        <ProblemSection 
          onOpenDemoModal={() => handleOpenDemoModal()} 
        />

        {/* 8 Practical Digital Solutions */}
        <ServicesSection 
          onOpenDemoModal={(id) => handleOpenDemoModal(id)} 
          onOpenCallModal={handleOpenCallModal} 
        />

        {/* Segmented Solutions by Business Type */}
        <SegmentsSection 
          onOpenDemoModal={(segmentId) => handleOpenDemoModal(segmentId)} 
        />

        {/* Structured Packages / Products */}
        <PackagesSection 
          onSelectPackage={handleSelectPackage}
          onOpenCallModal={handleOpenCallModal}
          onOpenDemoModal={() => handleOpenDemoModal()}
        />

        {/* Ongoing Management & Maintenance (Optional) */}
        <MaintenanceSection 
          onOpenCallModal={handleOpenCallModal} 
        />

        {/* Optional Customer Loyalty Club */}
        <BenefitsSection 
          onOpenDemoModal={() => handleOpenDemoModal()} 
        />

        {/* Demonstrative Projects & Case Studies */}
        <PortfolioSection 
          onOpenDemoModal={(projectTitle) => handleOpenDemoModal(projectTitle)} 
        />

        {/* How It Works - 5 Clear Steps */}
        <HowItWorksSection 
          onOpenDemoModal={() => handleOpenDemoModal()} 
        />

        {/* Core Differentials */}
        <DifferentialsSection />

        {/* High-Intent Conversion CTA Section */}
        <ConversionCtaSection 
          onOpenCallModal={handleOpenCallModal}
          onOpenDemoModal={(prefill) => handleOpenDemoModal(prefill)}
        />
      </main>

      {/* Structured Footer */}
      <Footer />

      {/* Floating Smart WhatsApp Assistant */}
      <WhatsAppAssistant />

      {/* Interactive Modals */}
      <FreeDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        initialSegment={demoInitialSegment}
        initialProject={demoInitialProject}
      />

      <ScheduleCallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
      />

      <PackageModal
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onOpenCallModal={handleOpenCallModal}
      />
    </div>
  );
}
