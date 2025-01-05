export interface PageSection {
    id: number;
    title: string;
    pageId: number;
    pageSectionDetailsList: SectionDetail[];
  }

  export interface SectionDetail {
    id: number;
    pageSectionId: number;
    title: string;
    subTitle: string;
    description: string;
    shortDescription: any;
    imageUrl: string;
    iconUrl: string;
    isActive: boolean;
    isDeleted: boolean;
  }

  export interface PageData {
    id: number;
    title: string;
    name: string | null;
    shortDescription: string;
    longDescription: string;
    bannerImgUrl: string;
    smallBannerImgUrl: string;
    pageCategoryId: number;
    pageName: string;
    pageUrlCode: string;
    pageCategoryName: string | null;
    pageCategory: string | null;
    llPageImages: string | null;
    sectionsDetailsList: SectionsDetailsList;
  }

  export interface SectionsDetailsList {
    id: number;
    title: string;
    pageId: number;
    pageSectionInputList: PageSection[];
  }
  