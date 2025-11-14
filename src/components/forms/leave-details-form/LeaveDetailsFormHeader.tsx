import { DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import OptimizedImage from "@/components/common/OptimizedImage"
import { pageContent } from "@/config/pageContent"

interface LeaveDetailsFormDialogHeaderProps {
	isSuccess: boolean
}

const LeaveDetailsFormDialogHeader = ({ isSuccess }: LeaveDetailsFormDialogHeaderProps) => {
	const content = pageContent.leaveDetailsForm

	return (
		<DialogHeader className="relative">
			{isSuccess ? (
				<VisuallyHidden>
					<DialogTitle>{content.header}</DialogTitle>
					<DialogDescription>{content.description}</DialogDescription>
				</VisuallyHidden>
			) : (
				<>
					<div className="flex justify-center mb-4">
						<OptimizedImage
							src={content.images.logo.url}
							alt={content.images.logo.alt}
							width={320}
							height={160}
							className="h-24 w-auto sm:h-28 md:h-32 lg:h-36 object-contain"
							priority
						/>
					</div>
					<DialogTitle className="text-center">{content.header}</DialogTitle>
					<DialogDescription className="text-center">{content.description}</DialogDescription>
				</>
			)}
		</DialogHeader>
	)
}

export default LeaveDetailsFormDialogHeader
