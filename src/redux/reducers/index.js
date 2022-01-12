import { combineReducers } from 'redux';
import categoryReducers from './categoryReducers';
import activeCategoryReducers from './activeCategoryReducers';
import loginReducers from './loginReducers';
import activeUserReducers from './activeUserReducers';
import loginModalReducers from './loginModalReducers';
import registerModalReducers from './registerModalReducers';
import activeMatchMessageReducers from './activeMatchMessageReducers';
import matchMessageReducers from './matchMessageReducers';
import activeMessageReducers from './activeMessageReducers';
import messageReducers from './messageReducers';
import roleReducers from './roleReducers';
import activeRoleReducers from './activeRoleReducers';
import userReducers from './userReducers';
import subCategoryReducers from './subCategoryReducers';
import activeSubCategoryReducers from './activeSubCategoryReducers';
import productReducers from './productReducers';
import activeProductReducers from './activeProductReducers';



const reducers=combineReducers({    
    activeCategoryReducers,
    categoryReducers,
    loginReducers,
    activeUserReducers,
    loginModalReducers,
    registerModalReducers,
    activeMatchMessageReducers,
    matchMessageReducers,
    activeMessageReducers,
    messageReducers,
    roleReducers,
    activeRoleReducers,
    userReducers,
    subCategoryReducers,
    activeSubCategoryReducers,
    productReducers,
    activeProductReducers,
})
export default reducers;