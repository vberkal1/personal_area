import { action, makeObservable, observable, runInAction } from "mobx";
import service from "./contactsStore.services";
import storageUtil from "../../utils/storageUtil";
import { AddContactParametrs, Contact } from "./contactsStore.models";
import { v4 as uuidv4 } from "uuid";

const initialStoreValues = {
  contacts: [],
};

class ContactsStore {
  contacts: Array<Contact> = initialStoreValues.contacts;

  constructor() {
    makeObservable(this, {
      contacts: observable,
      getContacts: action.bound,
      deleteContact: action.bound,
      addContact: action.bound,
      editContact: action.bound,
    });
  }

  async deleteContact(contactId: string): Promise<void> {
    try {
      const token = storageUtil.getAccessToken();
      if (token) {
        const requestContacts: Array<Contact> = this.contacts.filter(
          (contact) => contact.contactId !== contactId
        );
        const contacts: Array<Contact> = await service.editContacts(
          token,
          requestContacts
        );
        runInAction(() => {
          this.contacts = contacts;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async editContact(requestParametrs: AddContactParametrs, contactId: string): Promise<void> {
    const { name, number, url } = requestParametrs;
    const requestContacts: Array<Contact> = [...this.contacts];
    const index = requestContacts.findIndex((contact) => contact.contactId === contactId);
    requestContacts[index] = { contactId: uuidv4(), name, number, url };

    try {
      const token = storageUtil.getAccessToken();
      if (token) {
        const contacts: Array<Contact> = await service.editContacts(
          token,
          requestContacts
        );
        runInAction(() => {
          this.contacts = contacts;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addContact(requestParametrs: AddContactParametrs): Promise<void> {
    const { name, number, url } = requestParametrs;
    const requestContacts: Array<Contact> = [...this.contacts];
    requestContacts.push({ contactId: uuidv4(), name, number, url });
    try {
      const token = storageUtil.getAccessToken();
      if (token) {
        const contacts: Array<Contact> = await service.editContacts(
          token,
          requestContacts
        );
        runInAction(() => {
          this.contacts = contacts;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getContacts(): Promise<void> {
    try {
      const token = storageUtil.getAccessToken();
      if (token) {
        const contacts: Array<Contact> = await service.getContacts(token);
        runInAction(() => {
          this.contacts = contacts;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ContactsStore();
