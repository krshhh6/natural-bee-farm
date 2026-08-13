declare module 'firebase/app' {
  export function initializeApp(config: Record<string, any>): any;
}

declare module '@firebase/app' {
  export function initializeApp(config: Record<string, any>): any;
}

declare module 'firebase/auth' {
  export function getAuth(app?: any): any;
  export class GoogleAuthProvider {
    constructor();
  }
  export class OAuthProvider {
    constructor(providerId: string);
  }
  export function signInWithPopup(auth: any, provider: any): Promise<any>;
  export function signInWithEmailAndPassword(auth: any, email: string, pass: string): Promise<any>;
  export function createUserWithEmailAndPassword(auth: any, email: string, pass: string): Promise<any>;
  export function sendEmailVerification(user: any): Promise<void>;
  export function sendSignInLinkToEmail(auth: any, email: string, actionCodeSettings: any): Promise<void>;
  export function isSignInWithEmailLink(auth: any, url: string): boolean;
  export function signInWithEmailLink(auth: any, email: string, url: string): Promise<any>;
  export function signOut(auth: any): Promise<any>;
}

declare module '@firebase/auth' {
  export function getAuth(app?: any): any;
  export class GoogleAuthProvider {
    constructor();
  }
  export class OAuthProvider {
    constructor(providerId: string);
  }
  export function signInWithPopup(auth: any, provider: any): Promise<any>;
  export function signInWithEmailAndPassword(auth: any, email: string, pass: string): Promise<any>;
  export function createUserWithEmailAndPassword(auth: any, email: string, pass: string): Promise<any>;
  export function sendEmailVerification(user: any): Promise<void>;
  export function sendSignInLinkToEmail(auth: any, email: string, actionCodeSettings: any): Promise<void>;
  export function isSignInWithEmailLink(auth: any, url: string): boolean;
  export function signInWithEmailLink(auth: any, email: string, url: string): Promise<any>;
  export function signOut(auth: any): Promise<any>;
}

declare module 'firebase/firestore' {
  export function getFirestore(app?: any): any;
  export function doc(db: any, path: string, ...pathSegments: string[]): any;
  export function setDoc(reference: any, data: any, options?: any): Promise<void>;
  export function getDoc(reference: any): Promise<any>;
}

declare module '@firebase/firestore' {
  export function getFirestore(app?: any): any;
  export function doc(db: any, path: string, ...pathSegments: string[]): any;
  export function setDoc(reference: any, data: any, options?: any): Promise<void>;
  export function getDoc(reference: any): Promise<any>;
}
