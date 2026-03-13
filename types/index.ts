import { MotionValue } from "framer-motion";
import { StaticImageData } from "next/image";

export type TtextHoverProps = {
   titile1: string;
   titile2: string;
};

export type TmarqueeProps = {
   titile1: string;
   titile2: string;
   className: string;
};



export type TParagraphProps = {
   paragraph: string;
   minOffset?: number; // Optional prop for minimum offset
   maxOffset?: number; // Optional prop for maximum offset
};

export type TWordProps = {
   children: string;
   progress: MotionValue<number>;
   range: number[];
};

export interface AnimatedTextSectionProps {
  svgPath?: string; 
  svgPositionClasses?: string; // Optional prop for SVG position classes
  translationKey: string;
  bgColor?: string;
  textColor?: string;
  paragraphWidth?: string; // Optional prop for paragraph width
}

export interface ParagraphProps {
  translationKey: string;
  bgColor?: string;
  textColor?: string;
  paragraphWidth?: string;
  buttonLabel?: string;
  buttonLabel2?: string; // Optional prop for button label
  buttonHref?: string;
  buttonBgColor?: string; // Optional prop for button background color
  buttonTextColor?: string;
  numberOfParagraphs?: number; // Optional prop for number of paragraphs
}

// types/index.ts
export interface ReusableSliderProps {
	translationKey: string;
	numberOfSlides: number;
	bgColor?: string; // Colore di sfondo del div principale (es. "#FFD7EF")
	textColor?: string; // Nuovo: Colore dei titoli principali sopra lo slider (es. "#260A2F")
	sliderCardBgColor?: string; // Colore di sfondo delle slide (es. "#260A2F")
	sliderCardTextColor?: string; // Colore del testo all'interno delle slide (es. "#FFD7EF")
	arrowButtonBgColor?: string; // Colore di sfondo dei bottoni freccia (es. "#9fe870")
	arrowButtonHoverColor?: string; // Colore di hover dei bottoni freccia (es. "#FFEB69")
    reviews?: GoogleReview[];
}

export interface GoogleReview {
    rating: number;
    date: string;
    source: string;
    snippet: string;
    link: string;
    user?: {
      name: string;
      thumbnail: string;
      link: string;
    }
  }

export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    image: ImageFormat;
    thumbnail: ImageFormat;

  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}



// --- New Types for Strapi Article (v5) ---

export interface SeoModule {
  __component: "functional-components.seo-module";
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogType: string;
  ogImage?: Image;
  structuredData: any | null;
}

export interface HeroComponent {
  __component: "graphic-component.hero";
  id: number;
  title: string;
  subtitle: string;
  textPositioning: "center" | "bottom" | null;
  bgImage?: Image | Image[];
  overlayClasses: string | null;
  textClasses: string | null;
  heroClasses: string | null;
  cssClasses: string | null;
}

export interface ParagraphComponent {
  __component: "text-components.paragraph";
  id: number;
  text: string;
  imagePosition: "left" | "right" | "up" | "down" | null;
  image?: Image;
  isImportant: boolean | null;
  paragraphClasses: string | null;
  cssClasses: string | null;
}

export interface QuoteComponent {
  __component: "text-components.quote";
  id: number;
  text: string;
  author: string;
  authorDescription: string;
  authorDates: string;
  quoteClasses: string | null;
  cssClasses: string | null;
}

export interface CtaComponent {
  __component: "functional-components.cta";
  id: number;
  title: string;
  caption: string;
  contentPosition: "left" | "right" | "center" | null;
  buttonLabel?: string;
  buttonLink?: string;
  isExternal?: boolean;
  bgImage?: Image;
  overlayClasses: string | null;
  textClasses: string | null;
  ctaClasses: string | null;
  cssClasses: string | null;
}

export type ArticleContent =
  | HeroComponent
  | ParagraphComponent
  | QuoteComponent
  | CtaComponent;

export interface ArticleTag {
  name: string;
  description: string;
}

export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  caption: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  thumbnail: Image;
  SEO: SeoModule[];
  articleTags: ArticleTag[];
  Content: ArticleContent[];
}

export interface StrapiArticlesResponse {
  data: StrapiArticle[];
  meta: Meta;
}








export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}



export interface Customer {
  // Campi semplici
  name?: string;
  email: string;
  phone: string;
  isKhmer: boolean;
  wantsNewsletter: boolean;
}


// 1. Definizione per il componente all'interno della Dynamic Zone "package"
export interface PackageComponent {
  id: number;
  __component?: string; // Utile se hai più componenti nella dynamic zone
  minutes: number;
  price: number;
  discountedPrice: number | null; // O 'number | null' se il campo non è obbligatorio
}

// 2. Definizione per l'Enumeration "category"
// Sostituisci le stringhe qui sotto con i valori reali che hai impostato in Strapi
export type TreatmentCategory = 'Massage' | 'Bodycare and Beauty' | string;

// 3. Interfaccia principale per il Content Type "Treatment"
export interface Treatment {
  id: number;
  documentId: string; // Strapi v5 usa spesso documentId, altrimenti usa solo id
  title: string;
  description: string;
  category: TreatmentCategory;
  khTitle: string | null;
  khDescription: string | null;
  
  // Le Dynamic Zones in Strapi sono sempre array
  packages: PackageComponent[]; 

  // Campi standard generati da Strapi
  createdAt: string;
  updatedAt: string;
  publishedAt?: string; // Opzionale perché potrebbe essere una bozza
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'done' | string;

export interface Booking {
  id:string;
  documentId: string;
  // Campi semplici
  date: string;         // Strapi restituisce le date come stringa 'YYYY-MM-DD'
  time: string;         // Strapi restituisce il tempo come stringa 'HH:mm:ss.SSS'
  duration: number;     // Number
  price: number;        // Number
  
  // Enumeration
  bookingStatus: BookingStatus;

  // Campi di testo (Long Text o Text)
  notes?: string;            // Opzionale (può essere null)
  cancellationNotes?: string; // Opzionale

  // Relazioni (in Strapi v4 arrivano dentro un oggetto { data: ... })
  treatment?: Treatment ;
  customer?:  Customer ;
  masseuse?:  Masseuse ;

  // Campi standard di Strapi
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Masseuse {
  name: string;
  description: string;
  khDescription: string;
  img: Image;
  bookings: [];
}