
export const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              🚗 ClassicParts Finder
            </h3>
            <p className="text-green-200 text-sm">
              De slimste manier om klassieke auto-onderdelen te vinden. 
              Onze AI doorzoekt alle platforms zodat jij dat niet hoeft te doen.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Ondersteunde platforms</h4>
            <ul className="space-y-2 text-sm text-green-200">
              <li>• Marktplaats</li>
              <li>• eBay</li>
              <li>• AutoScout24</li>
              <li>• Classic & Sports Car</li>
              <li>• Oldtimerteile</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact & Support</h4>
            <div className="space-y-2 text-sm text-green-200">
              <p>📧 info@classicpartsfinder.nl</p>
              <p>📞 020-123-4567</p>
              <p>🕒 Ma-Vr: 9:00-17:00</p>
              <p>🏢 Amsterdam, Nederland</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-700 mt-8 pt-6 text-center text-green-200 text-sm">
          © 2024 ClassicParts Finder. Met ❤️ gemaakt voor klassieke auto-liefhebbers.
        </div>
      </div>
    </footer>
  );
};
