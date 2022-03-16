import axios, { AxiosResponse } from "axios";
import { Contact, PersonalContacts } from "./contactsStore.models";

class Service {
  getContacts(id: string): Promise<Array<Contact>> {
    return axios
      .get(`http://localhost:3001/contacts/${id}`)
      .then(
        (response: AxiosResponse<PersonalContacts>) => response.data.contactList
      );
  }
  deleteContact(
    id: string,
    requestContacts: Array<Contact>
  ): Promise<Array<Contact>> {
    return axios
      .patch(`http://localhost:3001/contacts/${id}`, {contactList: requestContacts})
      .then(
        (response: AxiosResponse<PersonalContacts>) => response.data.contactList
      );
  }
}

export default new Service();
