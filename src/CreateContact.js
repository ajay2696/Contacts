import React,{Component} from 'react'
import {Link} from 'react-router-dom';
import ImageInput from './ImageInput.js'
import serializeForm from 'form-serialize'
class CreateContact extends Component {
handleSubmit= (e) => {
  e.preventDefault();
  const values=serializeForm(e.target,{hash:true});
  this.props.handleSubmit(values);
}
 render(){
   return <div><div>
            <Link to='/' className='close-create-contact'>Close</Link>
          </div>
          <form className='create-contact-form' onSubmit={this.handleSubmit}>
            <ImageInput className='create-contact-avatar-input'
                        name='avatarURL'
                        maxHeight={64}
                        />
            <div className='create-contact-details'>
              <input type='text' name='name' placeholder='name'/>
              <input type='text' name='email' placeholder='email'/>
              <button> Add Contact </button>
            </div>
          </form>
          </div>
 }
}
export default CreateContact
