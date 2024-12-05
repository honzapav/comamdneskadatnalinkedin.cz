import React, { useState, useCallback } from 'react';
import { PostDisplay } from './PostDisplay';
import { ControlPanel } from './ControlPanel';
import { ImagePreview } from './ImagePreview';
import { generatePost, formatPost } from '../utils/generator';
import { generateImage } from '../utils/imageGenerator';
import { GeneratedPost } from '../types';

interface Profile {
  name: string;
  title: string;
  company: string;
  avatarUrl: string;
}

const czechNames = {
  male: [
    'Jan', 'Petr', 'Jiří', 'Josef', 'Pavel', 'Martin', 'Tomáš', 'Jaroslav', 'Miroslav',
    'Zdeněk', 'František', 'Václav', 'Michal', 'Milan', 'Karel', 'Lukáš', 'David', 'Jakub'
  ],
  female: [
    'Jana', 'Marie', 'Eva', 'Hana', 'Anna', 'Lenka', 'Kateřina', 'Lucie', 'Věra',
    'Alena', 'Petra', 'Veronika', 'Martina', 'Michaela', 'Tereza', 'Barbora', 'Markéta'
  ],
  surnames: [
    'Novák', 'Svoboda', 'Novotný', 'Dvořák', 'Černý', 'Procházka', 'Kučera', 'Veselý',
    'Horák', 'Němec', 'Marek', 'Pospíšil', 'Pokorný', 'Hájek', 'Král', 'Jelínek', 'Růžička',
    'Beneš', 'Fiala', 'Sedláček', 'Kolář', 'Krejčí', 'Navrátil', 'Čermák', 'Urban', 'Vaněk',
    'Blažek', 'Šimek', 'Kovář'
  ]
};

const titles = [
  'Innovation Lead',
  'Digital Transformation Manager',
  'Head of Digital Strategy',
  'Chief Innovation Officer',
  'Automation Specialist',
  'Digital Solutions Architect',
  'Process Innovation Manager',
  'Technology Evangelist',
  'Digital Experience Lead',
  'Transformation Consultant'
];

const companies = [
  'Digitální Řešení s.r.o.',
  'Tech Solutions CZ a.s.',
  'Inovace Plus s.r.o.',
  'Digital Masters Czech',
  'Smart Systems s.r.o.',
  'Future Technologies CZ',
  'Agilní Systémy a.s.',
  'Digital Force s.r.o.',
  'Czech Innovation Hub',
  'NextGen Solutions s.r.o.'
];

const generateRandomProfile = () => {
  const isFemale = Math.random() < 0.5;
  const firstName = isFemale 
    ? czechNames.female[Math.floor(Math.random() * czechNames.female.length)]
    : czechNames.male[Math.floor(Math.random() * czechNames.male.length)];
  const surname = czechNames.surnames[Math.floor(Math.random() * czechNames.surnames.length)];
  const name = `${firstName} ${surname}${isFemale && surname.endsWith('ý') ? 'á' : ''}`;
  
  const seed = encodeURIComponent(name.replace(/\s+/g, ''));
  const title = titles[Math.floor(Math.random() * titles.length)];
  const company = companies[Math.floor(Math.random() * companies.length)];

  return {
    name,
    title,
    company,
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4`
  };
};

export const GeneratorContainer: React.FC = () => {
  const [post, setPost] = useState<GeneratedPost>(generatePost());
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [showShareInstructions, setShowShareInstructions] = useState(false);
  const [profile, setProfile] = useState<Profile>(generateRandomProfile());

  const handleGenerate = useCallback(() => {
    setProfile(generateRandomProfile());
    setPost(generatePost());
  }, []);

  const handleCopy = useCallback(() => {
    const formattedPost = formatPost(post);
    navigator.clipboard.writeText(formattedPost);
    showNotification('Příspěvek byl zkopírován do schránky!');
  }, [post]);

  const handleShare = useCallback(async () => {
    try {
      setIsGeneratingImage(true);
      const imageDataUrl = await generateImage(post);
      
      const formattedPost = formatPost(post);
      await navigator.clipboard.writeText(formattedPost);

      const link = document.createElement('a');
      link.href = imageDataUrl;
      link.download = 'linkedin-post.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setShowShareInstructions(true);
    } catch (error) {
      console.error('Failed to prepare sharing:', error);
      showNotification('Nepodařilo se připravit příspěvek ke sdílení. Zkuste to prosím znovu.', true);
    } finally {
      setIsGeneratingImage(false);
    }
  }, [post]);

  const handleGenerateImage = useCallback(async () => {
    try {
      setIsGeneratingImage(true);
      const imageDataUrl = await generateImage(post);
      setGeneratedImageUrl(imageDataUrl);
      showNotification('Obrázek byl úspěšně vygenerován!');
    } catch (error) {
      console.error('Failed to generate image:', error);
      showNotification('Nepodařilo se vygenerovat obrázek. Zkuste to prosím znovu.', true);
    } finally {
      setIsGeneratingImage(false);
    }
  }, [post]);

  const handleDownloadImage = useCallback(() => {
    if (!generatedImageUrl) return;
    
    const link = document.createElement('a');
    link.href = generatedImageUrl;
    link.download = 'linkedin-post.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [generatedImageUrl]);

  const handleClosePreview = useCallback(() => {
    setGeneratedImageUrl(null);
  }, []);

  const handleCloseInstructions = useCallback(() => {
    setShowShareInstructions(false);
  }, []);

  const showNotification = (message: string, isError: boolean = false) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
      isError ? 'bg-red-500' : 'bg-green-500'
    } text-white transition-opacity duration-500 z-50`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-linkedin-background py-8 px-4 flex flex-col">
      <div className="max-w-4xl mx-auto flex-grow">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-linkedin-primary mb-2">
            Co mám dneska dát na LinkedIn? 🤔
          </h1>
          <p className="text-gray-600">
            Taky nevíte, co tam pořád dávat? Stejně všem jde jen o jedno. Přinášíme dávku inspirace pro vašich 15 minut slávy.
          </p>
        </header>

        <PostDisplay post={post} profile={profile} />

        <ControlPanel
          onGenerate={handleGenerate}
          onCopy={handleCopy}
          onShare={handleShare}
          onGenerateImage={handleGenerateImage}
        />

        {isGeneratingImage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-linkedin-primary mx-auto mb-4"></div>
              <p className="text-gray-700">Generuji obrázek...</p>
            </div>
          </div>
        )}

        {generatedImageUrl && (
          <ImagePreview
            imageUrl={generatedImageUrl}
            onClose={handleClosePreview}
            onDownload={handleDownloadImage}
          />
        )}

        {showShareInstructions && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Jak sdílet na LinkedIn</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                <li>Text příspěvku byl zkopírován do schránky</li>
                <li>Obrázek byl stažen do vašeho počítače</li>
                <li>Otevřete LinkedIn a klikněte na "Začít příspěvek"</li>
                <li>Vložte text ze schránky (Ctrl/Cmd + V)</li>
                <li>Klikněte na ikonu obrázku a nahrajte stažený soubor</li>
              </ol>
              <button
                onClick={handleCloseInstructions}
                className="w-full py-3 bg-linkedin-primary text-white rounded-lg hover:bg-linkedin-secondary transition-colors font-medium"
              >
                Rozumím
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="max-w-4xl mx-auto w-full mt-12 text-center">
        <p className="text-gray-500 text-sm italic">
          Při generování příspěvků nezneužíváme umělou inteligenci. Vytvořeno s 🧠 & ♥️
        </p>
      </footer>
    </div>
  );
}; 