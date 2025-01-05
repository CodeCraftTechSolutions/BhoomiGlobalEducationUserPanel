export interface Menu {
    path?: string;
    title?: string;
    type?: string;
    megaMenu?: boolean;
    image?: string;
    active?: boolean;
    badge?: boolean;
    badgeText?: string;
    children?: Menu[];
  }

  export interface AdditionalData {
    aboutUs: string | null;
    aboutOffice: string | null;
    email: string | null;
    phoneNumber: string | null;
    additionalPhoneNumber: string | null;
    siteLogoUrl: string | null;
    address: string | null;
    facebookUrl: string | null;
    twitterUrl: string | null;
    instagramUrl: string | null;
    linkedInUrl: string | null;
    TermsOfServiceId: number | null;
    PrivacyPolicyId: number | null;
    ContactUsId: number | null;
    AboutUsId: number | null;
    googleMapUrl: string | null;
  }
  
  export interface FooterMenu {
    pageCategoryId: number;
    name: string;
    isParent: boolean;
    url: string | null;
    codeUrl: string | null;
    pageId: number;
    footerMenu: FooterMenu[] | null; // Recursive structure for nested menus
    additionData: AdditionalData | null;
  }
  
  export interface PageCategory {
    pageCategoryId: number;
    name: string;
    isParent: boolean;
    url: string | null;
    codeUrl: string | null;
    pageId: number;
    footerMenu: FooterMenu[]; // List of footer menu items
    additionData: AdditionalData | null;
  }



  export interface Slider{
    id?: number;
    slider:string;
    name?: string;
    description?: string;
    orderBy?: number;
    imageUrl?: string;
    carouselType?: string;
    targetUrl?: string;
}
  
