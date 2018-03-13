import React from 'react';
import ListContacts from './ListContacts';
import * as ContactAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import {Route} from 'react-router-dom'

class App extends React.Component{
   state={
     contacts: [],
     screen:'list'
   }
   componentDidMount =()=>{
     ContactAPI.getAll().then((contacts)=>{
       this.setState({contacts})
     });
   }
   toggleScreen =()=>{
     this.setState({screen:'createcontact'});
   }
   removeContact=(contact)=>{
     this.setState((state) =>({contacts:state.contacts.filter(c=> c.id!==contact.id)}))
     ContactAPI.remove(contact);
   }
   handleSubmit=(contact)=>{
     ContactAPI.create(contact);
     this.setState((state) => ({contacts:state.contacts.concat(contact)}));
   }
   render(){
            return(<div className='app'>
                     <Route exact path='/' render={()=>(
                          <ListContacts contacts={this.state.contacts}
                                        onDeleteContact={this.removeContact}
                                        />
                          )} />
                      <Route path='/create'
                                render={({history)=>(
                                    <CreateContact handleSubmit={(contact) => {
                                                    this.handleSubmit(contact)
                                                    history.push('/')
                                                  }}
                                    />
                                  )}
                      />
                      </div>
                  )
          }


}
export default App;
