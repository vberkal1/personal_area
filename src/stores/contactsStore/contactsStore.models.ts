export type PersonalContacts = {
  id: string;
  contactList: Array<Contact>;
};

export type Contact = {
  contactId: string;
  name: string;
  number: string;
  url: string;
};
