import { SqlErs_Reimbursement } from "../dto/sql-ers_reimbursement";
import { Reimbursement } from "../model/reimbursement";

/**
 * This is used to convert a sql movie into an actual movie
 */


 export function reimbursementConverter(reimbursement: SqlErs_Reimbursement) {
  return new Reimbursement(reimbursement.reimb_id, reimbursement.reimb_amount, reimbursement.reimb_submitted,
     reimbursement.reimb_resolved, reimbursement.reimb_description, reimbursement.reimb_author,
      reimbursement.reimb_resolver, reimbursement.reimb_status_id)
}