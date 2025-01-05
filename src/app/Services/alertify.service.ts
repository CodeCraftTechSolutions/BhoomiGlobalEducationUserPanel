// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AlertifyService {

//     constructor() {
//     alertify.set('notifier', 'position', 'bottom-right');
//   }

//   confirm(message: string, okCallback: () => any) {
//     alertify.confirm(message, (e: any) => {
//       if (e) {
//         okCallback();
//       }
//       else { }
//     }).set({ transition: 'zoom' }).show().setHeader('  ');
//   }


//   confirmComment(comment: string, message: string, okCallback: () => any) {

//     const parent = document.createElement('div');
//     const label = document.createElement('label');
//     label.appendChild(document.createTextNode('Comment:'));
//     const pre = document.createElement('p');
//     //custom style.
//     pre.style.maxHeight = "200px";
//     pre.style.overflow = "scroll";
//     pre.style.position = "top-right"

//     pre.appendChild(document.createTextNode(comment));
//     const confrim = document.createElement('confrim');
//     confrim.appendChild(document.createTextNode(message));
//     parent.appendChild(label);
//     parent.appendChild(pre);
//     parent.appendChild(confrim);

//     alertify.confirm(parent, (e: any) => {
//       if (e) {
//         okCallback();
//       }
//       else { }
//     }).set({ transition: 'zoom' }).show().setHeader('Confirm');
//   }


//   confirmDeletion(objectName: string, okCallback: () => any) {
//     alertify.confirm(`Are you sure you want to delete ${objectName} ?`, (e: any) => {
//       if (e) {
//         okCallback();
//       }
//       else { }
//     }).set({ transition: 'zoom' }).show().setHeader('  ');
//   }

//   confirmRemove(str: string, okCallback: () => any) {
//     alertify.confirm(`Are you sure you want to remove ${str} ?`, (e: any) => {
//       if (e) {
//         okCallback();
//       }
//       else { }
//     }).set({ transition: 'zoom' }).show().setHeader('  ');
//   }

//   success(message: string) {
//     alertify.success(message);

//   }

//   error(message: string) {
//     alertify.error(message);
//   }
//   saveError(componentName: string) {
//     alertify.error("Something went wrong while adding " + componentName + ".");
//   }
//   deletionError(componentName: string) {
//     alertify.error("Something went wrong while deleting " + componentName + ".");
//   }
//   getError(componentName: string) {
//     alertify.error("Something went wrong while getting " + componentName + ".");
//   }
//   warning(message: string) {
//     alertify.warning(message);
//   }

//   message(message: string) {
//     alertify.warning(message);
//   }


// }
