export interface SelectOption {
  label: string;
  value: string;
}

export const featuredMakes: SelectOption[] = [
  // ألماني
  { label: 'مرسيدس بنز (Mercedes-Benz)', value: 'Mercedes-Benz' },
  { label: 'بي إم دبليو (BMW)', value: 'BMW' },
  { label: 'أودي (Audi)', value: 'Audi' },
  { label: 'فولكس فاجن (Volkswagen)', value: 'Volkswagen' },
  { label: 'بورشه (Porsche)', value: 'Porsche' },
  { label: 'أوبل (Opel)', value: 'Opel' },
  // ياباني
  { label: 'تويوتا (Toyota)', value: 'Toyota' },
  { label: 'هوندا (Honda)', value: 'Honda' },
  { label: 'نيسان (Nissan)', value: 'Nissan' },
  { label: 'مازدا (Mazda)', value: 'Mazda' },
  { label: 'ميتسوبيشي (Mitsubishi)', value: 'Mitsubishi' },
  { label: 'لكزس (Lexus)', value: 'Lexus' },
  { label: 'سوزوكي (Suzuki)', value: 'Suzuki' },
  { label: 'سوبارو (Subaru)', value: 'Subaru' },
  { label: 'إنفينيتي (Infiniti)', value: 'Infiniti' },
  // كوري
  { label: 'هيونداي (Hyundai)', value: 'Hyundai' },
  { label: 'كيا (Kia)', value: 'Kia' },
  { label: 'جينيسيس (Genesis)', value: 'Genesis' },
  // أمريكي
  { label: 'تيسلا (Tesla)', value: 'Tesla' },
  { label: 'فورد (Ford)', value: 'Ford' },
  { label: 'شفروليه (Chevrolet)', value: 'Chevrolet' },
  { label: 'جيب (Jeep)', value: 'Jeep' },
  { label: 'كاديلاك (Cadillac)', value: 'Cadillac' },
  { label: 'دودج (Dodge)', value: 'Dodge' },
  { label: 'جي إم سي (GMC)', value: 'GMC' },
  // صيني
  { label: 'بي واي دي (BYD)', value: 'BYD' },
  { label: 'جيلي (Geely)', value: 'Geely' },
  { label: 'إم جي (MG)', value: 'MG' },
  { label: 'شيري (Chery)', value: 'Chery' },
  { label: 'هافال (Haval)', value: 'Haval' },
  { label: 'شاومي (Xiaomi)', value: 'Xiaomi' },
  // أوروبي
  { label: 'فيراري (Ferrari)', value: 'Ferrari' },
  { label: 'لامبورجيني (Lamborghini)', value: 'Lamborghini' },
  { label: 'فيات (Fiat)', value: 'Fiat' },
  { label: 'رينو (Renault)', value: 'Renault' },
  { label: 'بيجو (Peugeot)', value: 'Peugeot' },
  { label: 'ستروين (Citroën)', value: 'Citroen' },
  { label: 'فولفو (Volvo)', value: 'Volvo' },
  { label: 'لاند روفر (Land Rover)', value: 'Land Rover' },
  { label: 'جاكوار (Jaguar)', value: 'Jaguar' },
  { label: 'أستون مارتن (Aston Martin)', value: 'Aston Martin' },
];

export const getMakes = async (): Promise<SelectOption[]> => {
  try {
    const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json');
    const data = await response.json();
    
    if (!data || !data.Results) throw new Error('API Error');
    
    const apiMakes = data.Results.map((m: any) => m.Make_Name)
      .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i)
      .sort((a: string, b: string) => a.localeCompare(b));
    
    // Filter out API makes that are already in featuredMakes
    const featuredValues = featuredMakes.map(f => f.value.toLowerCase());
    const remainingMakes = apiMakes
      .filter((m: string) => !featuredValues.includes(m.toLowerCase()))
      .map((m: string) => ({ label: m, value: m }));
    
    // Featured makes appear first
    return [...featuredMakes, ...remainingMakes];
  } catch (error) {
    console.warn('Error fetching makes, falling back to static list:', error);
    return featuredMakes;
  }
};

export const getModels = async (make: string): Promise<SelectOption[]> => {
  try {
    const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${encodeURIComponent(make)}?format=json`);
    const data = await response.json();
    
    if (!data || !data.Results) throw new Error('API Error');
    
    const results = data.Results.map((m: any) => m.Model_Name)
      .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i)
      .sort((a: string, b: string) => a.localeCompare(b));
    
    return results.map((r: string) => ({ label: r, value: r }));
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
};
