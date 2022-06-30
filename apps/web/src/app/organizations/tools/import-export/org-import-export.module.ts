import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { JslibModule } from "@bitwarden/angular/jslib.module";
import { ApiService } from "@bitwarden/common/abstractions/api.service";
import { CipherService } from "@bitwarden/common/abstractions/cipher.service";
import { CollectionService } from "@bitwarden/common/abstractions/collection.service";
import { CryptoService } from "@bitwarden/common/abstractions/crypto.service";
import { FolderService } from "@bitwarden/common/abstractions/folder/folder.service";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { ImportService as ImportServiceAbstraction } from "@bitwarden/common/abstractions/import.service";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import { ImportService } from "@bitwarden/common/services/import.service";

import { LooseComponentsModule } from "../../../modules/loose-components.module";

import { OrganizationExportComponent } from "./org-export.component";
import { OrganizationImportExportRoutingModule } from "./org-import-export-routing.module";
import { OrganizationImportComponent } from "./org-import.component";

@NgModule({
  imports: [
    CommonModule,
    JslibModule,
    LooseComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    OrganizationImportExportRoutingModule,
  ],
  declarations: [OrganizationImportComponent, OrganizationExportComponent],
  providers: [
    {
      provide: ImportServiceAbstraction,
      useClass: ImportService,
      deps: [
        CipherService,
        FolderService,
        ApiService,
        I18nService,
        CollectionService,
        PlatformUtilsService,
        CryptoService,
      ],
    },
  ],
})
export class OrganizationImportExportModule {}
