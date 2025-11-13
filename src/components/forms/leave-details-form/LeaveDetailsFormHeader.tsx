import { DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import OptimizedImage from "@/components/common/OptimizedImage"

interface LeaveDetailsFormDialogHeaderProps {
	isSuccess: boolean
}

const LeaveDetailsFormDialogHeader = ({ isSuccess }: LeaveDetailsFormDialogHeaderProps) => {
	const { header, desc } = {
		header: "נעים להכיר!",
		desc: "השאירו פרטים לשיחת ייעוץ בחינם - תספרו לנו מה העסק שלכם צריך ותקבלו טיפים שתוכלו ליישם מיד",
	}

	return (
		<DialogHeader className="relative">
			{isSuccess ? (
				<VisuallyHidden>
					<DialogTitle>{header}</DialogTitle>
					<DialogDescription>{desc}</DialogDescription>
				</VisuallyHidden>
			) : (
				<>
					<div className="flex justify-center mb-4">
						<OptimizedImage
							src="https://res.cloudinary.com/dudwjf2pu/image/upload/c_crop,w_2800/v1763052733/BishvilHamashkanta/%D7%9C%D7%95%D7%92%D7%95_daxkfc.png"
							alt="Logo"
							width={320}
							height={160}
							className="h-24 w-auto sm:h-28 md:h-32 lg:h-36 object-contain"
							priority
						/>
					</div>
					<DialogTitle className="text-center">{header}</DialogTitle>
					<DialogDescription className="text-center">{desc}</DialogDescription>
				</>
			)}
		</DialogHeader>
	)
}

export default LeaveDetailsFormDialogHeader
