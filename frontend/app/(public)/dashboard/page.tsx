import SummaryStatWidget from "@/components/donutchart/summaryStatWidget";
import StatusModal from "@/components/formStatusModal/statusModal";
import TableSort from "@/components/table/TableSort";

/**
 * Dashboard Components visible to the Procurement Staff
 * 
 * docs
 * pending tasks:    pending requisitions, purchase orders, awaiting approvals, pending vendor responses
 * notifications
 * recent activity feed:    submitted requisitions, approved orders
 * tips and reminders
 * budget overview:    allocated, remaining, spent percentage, warning limits
 * search and filter
 * quick links:    manage vendors, check status of purchase orders
 * KPI:    cost savings achieved, vendor performer ratings, fulfillment of timelines
 * charts:    spending trends, order volumes, vendor distribution
 * personalized widgets
 */

export default function DashboardPage() {
	return (
		<>
			<SummaryStatWidget />
			<div className="flex content-center p-8 sm:px-28">
				<TableSort/>
			</div>	
			<div className="flex content-center p-8 sm:px-28">
			<StatusModal/>
			</div>	
			
		</>
	);
}