import { CoreModule } from 'core/core.module';
import { SharedModule } from 'modules/shared/shared.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { LoggedGuard } from './core/services/guards/logged/logged.guard';
import { GraphqlModule } from 'core/modules/graphql/graphql.module';

/* export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({ uri: 'http://localhost:3333/graphql' }),
    cache: new InMemoryCache(),
  };
} */

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    GraphqlModule,
    HttpLinkModule
  ],
  providers: [
    LoggedGuard,
/*     {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    }, */
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
