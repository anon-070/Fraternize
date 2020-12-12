import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css';

import { Chapters } from './components/chapters/Chapters';
import { CreateChapter } from './components/chapters/Create';
import { EditChapter } from './components/chapters/Edit';


import { Committees } from './components/committees/Committees';
import { CreateCommittee } from './components/committees/Create';
import { EditCommittee } from './components/committees/Edit';


import { Titles } from './components/titles/Titles';
import { CreateTitle } from './components/titles/Create';
import { EditTitle } from './components/titles/Edit';


import { Professions } from './components/professions/Professions';
import { CreateProfession } from './components/professions/Create';
import { EditProfession } from './components/professions/Edit';

import { MemberDatas } from './components/members/Members';
import { CreateMemberData } from './components/members/Create';
import { EditMemberData } from './components/members/Edit';


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/chapters/edit/:chapterId" component={EditChapter} />
                    <Route path="/chapters/create" component={CreateChapter} />
                    <Route path="/chapters" component={Chapters} />

                    <Route path="/members/edit/:memberDataId" component={EditMemberData} />
                    <Route path="/members/create" component={CreateMemberData} />
                    <Route path="/members" component={MemberDatas} />

                    <Route path="/titles/edit/:titleId" component={EditTitle} />
                    <Route path="/titles/create" component={CreateTitle} />
                    <Route path="/titles" component={Titles} />

                    <Route path="/professions/edit/:professionId" component={EditProfession} />
                    <Route path="/professions/create" component={CreateProfession} />
                    <Route path="/professions" component={Professions} />

                    <Route path="/committees/edit/:committeeId" component={EditCommittee} />
                    <Route path="/committees/create" component={CreateCommittee} />
                    <Route path="/committees" component={Committees} />

                    <Route exact path='/' component={MemberDatas} />

                </Switch>

                <AuthorizeRoute path='/fetch-data' component={FetchData} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </Layout>
        );
    }
}
