import React,{Component} from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import {Link} from 'react-router-dom';
/*ListContacts.propTypes={
  contacts:PropTypes.array.isRequired,
  onDeleteContact:PropTypes.func.isRequired
}*/

class ListContacts extends Component{
  static propTypes={
    contacts:PropTypes.array.isRequired,
    onDeleteContact:PropTypes.func.isRequired
  }
  state={
    query:''
  }
  updateQuery( value){
   this.setState({query:value.trim()});
  }
  resetQuery(){
     this.setState({query:''});
  }
  render(){
    console.log(this.props.contacts);
    const {contacts,onDeleteContact}=this.props;
    const {query} = this.state;

    let showContacts;
    if(this.state.query){
      const match = new RegExp(escapeRegExp(query),'i');
      showContacts = contacts.filter((contact)=> match.test(contact.name));
    } else {
      showContacts= contacts;
    }
    showContacts.sort(sortBy('name'));
    return  <div className='list-contacts'>
              <div className='list-contacts-top'>
                <input type='text' className='search-contacts' value={query}
                        placeholder='Search Contact'
                        onChange={(event)=>this.updateQuery(event.target.value)}/>
                <Link to='/create'
                   className='add-contact'
                />
              </div>
              {showContacts.length!== contacts.length &&
                (<div className='showing-contacts'>
                  <span>Displaying {showContacts.length} of {contacts.length}</span>
                 <button onClick={()=>this.resetQuery()}>showAll</button>
                 </div>)}
              <ol className='contact-list'>
               {showContacts.map((contact)=>(
                       <li key={contact.id} className='contact-list-item'>
                        <div className='contact-avatar' style={{
                          backgroundImage:`url(${contact.avatarURL})`
                        }}>
                        </div>
                       <div className='contact-details'>
                        <p>{contact.name}</p>
                        <p>{contact.email}</p>
                       </div>
                       <button onClick={()=>{onDeleteContact(contact)}} className='contact-remove'>
                         Remove
                       </button>
                       </li>)
                     )
               }
              </ol>
            </div>;
  }
}
export default ListContacts;
