import { action, makeObservable, observable, runInAction } from "mobx";
import service from "./contactsStore.services";
import storageUtil from "../../utils/storageUtil";
import { Contact } from "./contactsStore.models";

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
    });
  }

  async deleteContact(contactId: string): Promise<void> {
    try {
      const token = storageUtil.getAccessToken();
      if (token) {
        const requestContacts: Array<Contact> = this.contacts
        .filter((contact) => contact.contactId !== contactId);
        const contacts: Array<Contact> = await service.deleteContact(
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
