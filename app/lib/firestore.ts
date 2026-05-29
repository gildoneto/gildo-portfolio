import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  orderBy,
  query,
  type Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
  project: string;
  message?: string;
  lang: string;
  read: boolean;
  createdAt: Timestamp | null;
}

export type NewContact = Omit<ContactMessage, "id" | "read" | "createdAt">;

export async function saveContact(data: NewContact): Promise<void> {
  await addDoc(collection(db, "contacts"), {
    ...data,
    read: false,
    createdAt: serverTimestamp(),
  });
}

export async function getContacts(): Promise<ContactMessage[]> {
  const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<ContactMessage, "id">),
  }));
}

export async function markAsRead(id: string): Promise<void> {
  await updateDoc(doc(db, "contacts", id), { read: true });
}
